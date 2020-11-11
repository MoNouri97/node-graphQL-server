import {
	Arg,
	Ctx,
	Field,
	FieldResolver,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	Root,
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

@Resolver(User)
export class UserResolver {
	@FieldResolver(() => String)
	email(@Root() user: User, @Ctx() { req }: MyContext) {
		if (user.id == req.session!.userId) {
			return user.email;
		}
		return '';
	}

	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
		if (!req.session!.userId) {
			return undefined;
		}
		return User.findOne(req.session!.userId);
	}

	@Mutation(() => UserResponse)
	async register(
		@Ctx() { req }: MyContext,
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
		let user;
		try {
			user = await User.create({
				username,
				password: hashed,
				email,
			}).save();
		} catch (error) {
			const detail: string = error.detail;

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
			return {
				errors: [{ field: '', message: '500 Internal Error' }],
			};
		}
		req.session!.userId = user.id;

		return {
			user,
		};
	}

	@Mutation(() => UserResponse)
	async login(
		@Ctx() { req }: MyContext,
		@Arg('option') { password, usernameOrEmail }: LoginInput,
	): Promise<UserResponse> {
		const user = await User.findOne({
			where: usernameOrEmail.includes('@')
				? {
						email: usernameOrEmail,
				  }
				: {
						username: usernameOrEmail,
				  },
		});

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
		@Ctx() { redis }: MyContext,
	) {
		const user = await User.findOne({ where: { email } });

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
		@Ctx() { redis, req }: MyContext,
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
		const userIdNum = parseInt(userId);
		const user = await User.findOne({ id: userIdNum });
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
		User.update(
			{ id: userIdNum },
			{
				password: await argon2.hash(password),
			},
		);
		redis.del(key);
		// log the user in
		req.session!.userId = user.id;
		return {
			user,
		};
	}
}
