import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import redis from 'redis';
import session from 'express-session';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import connectRedis from 'connect-redis';
import { MyContext } from './types';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const main = async () => {
	const orm = await MikroORM.init(mikroConfig);
	await orm.getMigrator().up();

	const app = express();

	app.get('/', (_, res) => {
		res.send('hello world');
	});

	// session & redis
	app.use(
		session({
			name: 'qid',
			store: new RedisStore({
				client: redisClient,
				disableTouch: true,
				disableTTL: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
				httpOnly: true,
				secure: __prod__, // https
				sameSite: 'lax', // csrf
			},
			secret: 'shhhhhhh',
			resave: false,
			saveUninitialized: false,
		}),
	);
	console.log({ __prod__ });

	// apollo
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
	});
	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log('server started on port 4000');
	});
};

main().catch(err => {
	console.log(err);
});
