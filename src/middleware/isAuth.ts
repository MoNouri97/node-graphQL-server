import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const isAuth: MiddlewareFn<MyContext> = ({ context: { req } }, next) => {
	if (!req.session?.userId) {
		throw new Error('not authenticated');
	}

	return next();
};
