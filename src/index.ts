import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
// import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

const main = async () => {
	const orm = await MikroORM.init(mikroConfig);
	orm.getMigrator().up();

	const app = express();

	app.get('/', (_, res) => {
		res.send('hello world');
	});

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver],
			validate: false,
		}),
		context: () => ({ em: orm.em }),
	});
	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log('server started on port 4000');
	});
};

main().catch(err => {
	console.log(err);
});
