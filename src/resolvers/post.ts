import { limits } from 'argon2';
import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Post } from '../entities/Post';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { PaginatedPosts, PostInput } from './types';

@Resolver(Post)
export class PostResolver {
	@FieldResolver(() => String)
	textPreview(@Root() root: Post) {
		return root.text.slice(0, 50);
	}

	@Query(() => PaginatedPosts)
	async posts(
		@Arg('limit', () => Int) limit: number,
		@Arg('cursor', () => String, { nullable: true }) cursor: string | null,
	): Promise<PaginatedPosts> {
		const realLimit = Math.min(50, limit);
		const realLimitPlusOne = realLimit + 1;

		const replacements: any[] = [realLimitPlusOne];
		if (cursor) replacements.push(new Date(parseInt(cursor)));

		const posts = await getConnection().query(
			`select p.*, 
			json_build_object(
				'id',u.id,
				'username',u.username,
				'email',u.email,
				'updatedAt',u."updatedAt",
				'createdAt',u."createdAt") creator 
			from post p
			INNER JOIN public.user u ON p."creatorId" = u.id
			${cursor ? 'where p."createdAt" < $2 ' : ''}
			order by p."createdAt" DESC
			limit $1
			`,
			replacements,
		);

		// const query = await getConnection()
		// 	.getRepository(Post)
		// 	.createQueryBuilder('p')
		// 	.innerJoinAndSelect('p.creator', 'u', 'u.id = p."creatorId"')
		// 	// double quote or else createdAt becomes createdat and causes a postgresql error
		// 	.orderBy('p."createdAt"', 'DESC')
		// 	.take(realLimitPlusOne);

		// if (cursor)
		// 	query.where('p."createdAt" < :cursor', {
		// 		cursor: new Date(parseInt(cursor)),
		// 	});

		// const posts = await query.getMany();
		return {
			posts: posts.slice(0, realLimit),
			hasMore: posts.length === realLimitPlusOne,
		};
	}

	@Query(() => Post, { nullable: true })
	post(@Arg('id') id: number): Promise<Post | undefined> {
		return Post.findOne(id);
	}

	@Mutation(() => Post)
	@UseMiddleware(isAuth)
	createPost(
		@Arg('input') input: PostInput,
		@Ctx() { req }: MyContext,
	): Promise<Post> {
		return Post.create({ ...input, creatorId: req.session!.userId }).save();
	}

	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg('id') id: number,
		@Arg('title', { nullable: true }) title: string,
	): Promise<Post | undefined> {
		let post = await Post.findOne(id);

		if (!post) return undefined;

		// await Post.update({ id }, { title });
		if (typeof title !== 'undefined') {
		}

		return post;
	}

	@Mutation(() => Boolean)
	async deletePost(@Arg('id') id: number): Promise<boolean> {
		try {
			await Post.delete(id);
		} catch (error) {
			return false;
		}

		return true;
	}
}
