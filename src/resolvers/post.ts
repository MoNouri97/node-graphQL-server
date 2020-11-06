import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { PostInput } from './types';

@Resolver()
export class PostResolver {
	@Query(() => [Post])
	posts(): Promise<Post[]> {
		return Post.find();
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
