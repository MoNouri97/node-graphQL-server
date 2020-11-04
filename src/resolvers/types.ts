import { Field, InputType } from 'type-graphql';

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
