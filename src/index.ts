import 'reflect-metadata';
import { COOKIE_NAME, __prod__ } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import Redis from 'ioredis';
import session from 'express-session';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import connectRedis from 'connect-redis';
import { MyContext } from './types';
import { createConnection } from 'typeorm';
import { Post } from './entities/Post';
import { User } from './entities/User';
const RedisStore = connectRedis(session);
const redis = new Redis();

const main = async () => {
	const conn = createConnection({
		database: 'lireddit2',
		type: 'postgres',
		username: 'postgres',
		password: 'postgres',
		logging: true,
		synchronize: true,
		entities: [Post, User],
	});

	const app = express();

	app.get('/', (_, res) => {
		res.send('hello world');
	});

	// session & redis
	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redis,
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

	// apollo
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({ req, res, redis }),
	});
	apolloServer.applyMiddleware({
		app,
		cors: { origin: 'http://localhost:3000', credentials: true },
	});

	app.listen(4000, () => {
		console.log({ __prod__ });
		console.log('server started on port 4000');
	});
};

main().catch(err => {
	console.log(err);
});
