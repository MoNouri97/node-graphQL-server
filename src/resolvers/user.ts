import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
	@Field()
	username: string;
	@Field()
	password: string;
}

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
	errors?: [FieldError];
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
		@Arg('option') { password, username }: UsernamePasswordInput,
	): Promise<UserResponse> {
		// validation
		if (username.length < 3) {
			return {
				errors: [
					{
						field: 'username',
						message: 'must contain at least 3 characters',
					},
				],
			};
		}
		if (password.length < 3) {
			return {
				errors: [
					{
						field: 'password',
						message: 'must contain at least 3 characters',
					},
				],
			};
		}

		// hashing pw & saving user
		const hashed = await argon2.hash(password);
		const user = await em.create(User, {
			username: username,
			password: hashed,
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
			if (detail.includes('already exists'))
				return {
					errors: [
						{
							field: 'username',
							message: 'username already taken',
						},
					],
				};
		}

		req.session!.userId = user.id;

		return {
			user,
		};
	}

	@Mutation(() => UserResponse)
	async login(
		@Ctx() { em, req }: MyContext,
		@Arg('option') { password, username }: UsernamePasswordInput,
	): Promise<UserResponse> {
		// validation
		if (username.length < 3) {
			return {
				errors: [
					{
						field: 'username',
						message: 'must contain at least 3 characters',
					},
				],
			};
		}
		if (password.length < 3) {
			return {
				errors: [
					{
						field: 'password',
						message: 'must contain at least 3 characters',
					},
				],
			};
		}

		// hashing pw & saving user
		const user = await em.findOne(User, {
			username: username,
		});
		if (!user) {
			return {
				errors: [
					{
						field: 'username',
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
}
