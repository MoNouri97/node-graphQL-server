import { Field, InputType, ObjectType } from 'type-graphql';
import { Post } from '../entities/Post';

// User---------------------
@InputType()
export class LoginInput {
	@Field()
	usernameOrEmail: string;
	@Field()
	password: string;
}
@InputType()
export class RegisterInput {
	@Field()
	username: string;
	@Field()
	email: string;
	@Field()
	password: string;
}

// Post---------------------
@InputType()
export class PostInput {
	@Field()
	title: string;
	@Field()
	text: string;
}
@ObjectType()
export class PaginatedPosts {
	@Field(() => [Post])
	posts: Post[];
	@Field()
	hasMore: boolean;
}
