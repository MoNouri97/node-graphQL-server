import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Post } from '../entities/Post';

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
	createPost(@Arg('title') title: string): Promise<Post> {
		return Post.create({ title }).save();
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
