import { RegisterInput } from '../resolvers/types';

export const validateRegister = ({
	username,
	email,
	password,
}: RegisterInput) => {
	if (username.length < 3) {
		return [
			{
				field: 'username',
				message: 'must contain at least 3 characters',
			},
		];
	}
	if (username.includes('@')) {
		return [
			{
				field: 'username',
				message: 'cannot include @',
			},
		];
	}
	if (!email.includes('@') || email.length < 3) {
		return [
			{
				field: 'email',
				message: 'not a valid email',
			},
		];
	}
	if (password.length < 3) {
		return [
			{
				field: 'password',
				message: 'must contain at least 3 characters',
			},
		];
	}
	return null;
};
