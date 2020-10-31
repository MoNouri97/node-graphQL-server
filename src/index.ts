import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';

const main = async () => {
	const orm = await MikroORM.init(mikroConfig);
	orm.getMigrator().up();
	// const post = orm.em.create(Post, { title: 'first post' });
	// await orm.em.persistAndFlush(post);

	const post = await orm.em.find(Post, {});
	console.log(post);
};

main().catch(err => {
	console.log(err);
});
