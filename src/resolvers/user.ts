import {
	Arg,
	Ctx,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';
import argon2 from 'argon2';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants';
import { RegisterInput, LoginInput } from './types';
import { validateRegister } from '../utils/validateRegister';
import { v4 } from 'uuid';
import { sendEmail } from '../utils/sendEmail';

@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
		if (!req.session!.userId) {
			return null;
		}
		const user = await em.findOne(User, { id: req.session!.userId });
		return user;
	}

	@Mutation(() => UserResponse)
	async register(
		@Ctx() { em, req }: MyContext,
		@Arg('option') { password, username, email }: RegisterInput,
	): Promise<UserResponse> {
		// validation
		const errors = validateRegister({ password, username, email });
		if (errors) {
			return {
				errors: errors,
			};
		}
		// hashing pw & saving user
		const hashed = await argon2.hash(password);
		const user = await em.create(User, {
			username,
			password: hashed,
			email,
		});
		try {
			await em.persistAndFlush(user);
			// using query builder :
			// import { EntityManager } from '@mikro-orm/postgresql';
			// const result = await (em as EntityManager)
			// 	.createQueryBuilder(User)
			// 	.getKnexQuery()
			// 	.insert({
			// 		username: username,
			// 		password: hashed,
			// 		created_at: new Date(),
			// 		updated_at: new Date(),
			// 	})
			// 	.returning('*');
		} catch (error) {
			const detail: string = error.detail;
			console.log(error);

			if (detail.includes('already exists')) {
				const err: FieldError = detail.includes('email')
					? {
							field: 'email',
							message: 'an account with this email already exists',
					  }
					: {
							field: 'username',
							message: 'username already taken',
					  };
				return {
					errors: [err],
				};
			}
		}

		req.session!.userId = user.id;

		return {
			user,
		};
	}

	@Mutation(() => UserResponse)
	async login(
		@Ctx() { em, req }: MyContext,
		@Arg('option') { password, usernameOrEmail }: LoginInput,
	): Promise<UserResponse> {
		const user = await em.findOne(
			User,
			usernameOrEmail.includes('@')
				? {
						email: usernameOrEmail,
				  }
				: {
						username: usernameOrEmail,
				  },
		);

		if (!user) {
			return {
				errors: [
					{
						field: 'usernameOrEmail',
						message: 'user does not exist',
					},
				],
			};
		}
		const valid = await argon2.verify(user.password, password);
		if (!valid) {
			return {
				errors: [
					{
						field: 'password',
						message: 'incorrect password',
					},
				],
			};
		}
		req.session!.userId = user.id;
		return {
			user,
		};
	}

	@Mutation(() => Boolean)
	async logout(@Ctx() { req, res }: MyContext) {
		return new Promise<boolean>(resolve =>
			req.session?.destroy(err => {
				res.clearCookie(COOKIE_NAME);
				if (err) {
					console.log(err);
					return resolve(false);
				}
				return resolve(true);
			}),
		);
	}

	@Mutation(() => Boolean)
	async forgotPassword(
		@Arg('email') email: string,
		@Ctx() { em, redis }: MyContext,
	) {
		const user = await em.findOne(User, { email });

		if (!user) return true;

		const token = v4();
		await redis.set(FORGET_PASSWORD_PREFIX + token, user.id);
		sendEmail(
			user.email,
			'Change Password',
			`<a href='http://localhost:3000/change-password/${token}'>Change Password<a/>`,
		);

		return true;
	}

	@Mutation(() => UserResponse)
	async changePassword(
		@Arg('token') token: string,
		@Arg('password') password: string,
		@Ctx() { em, redis, req }: MyContext,
	): Promise<UserResponse> {
		const key = FORGET_PASSWORD_PREFIX + token;
		const userId = await redis.get(key);
		if (!userId) {
			return {
				errors: [
					{
						field: 'token',
						message: 'token expired',
					},
				],
			};
		}
		const user = await em.findOne(User, { id: parseInt(userId) });
		if (!user) {
			return {
				errors: [
					{
						field: 'user',
						message: 'user no longer exists',
					},
				],
			};
		}
		user.password = await argon2.hash(password);
		await em.persistAndFlush(user);
		redis.del(key);
		// log the user in
		req.session!.userId = user.id;
		return {
			user,
		};
	}
}
