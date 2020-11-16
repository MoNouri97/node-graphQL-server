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
import { User } from '../entities/User';
import { Vote } from '../entities/Vote';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { PaginatedPosts, PostInput } from './types';

@Resolver(Post)
export class PostResolver {
	@FieldResolver(() => String)
	textPreview(@Root() root: Post) {
		return root.text.slice(0, 50);
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async vote(
		@Arg('postId', () => Int) postId: number,
		@Arg('value', () => Int) value: number,
		@Ctx() { req }: MyContext,
	) {
		const { userId } = req.session!;
		const isUpVote = value != -1;
		const realValue = isUpVote ? 1 : -1;
		const vote = await Vote.findOne({ where: { postId, userId } });
		console.log({ value, realValue, vote });

		// already voted , same vote
		if (vote && vote.value == realValue) {
			return true;
		}
		// new vote
		if (!vote) {
			await getConnection().transaction(async em => {
				em.query(
					`
				INSERT INTO vote("userId","postId",value)
				VALUES($1,$2,$3)
				`,
					[userId, postId, realValue],
				);
				em.query(
					`
				UPDATE post
				SET points = points + $1
				WHERE id = $2 
				`,
					[realValue, postId],
				);
			});
			return true;
		}
		// changing votes
		await getConnection().transaction(async em => {
			em.query(
				`
				UPDATE vote
				SET value = $1
				WHERE "postId"=$2 AND "userId"=$3
			`,
				[realValue, postId, userId],
			);

			em.query(
				`
			UPDATE post
			SET points = points + $1
			WHERE id = $2 
			`,
				[2 * realValue, postId],
			);
		});
		return true;
	}

	@Query(() => PaginatedPosts)
	async posts(
		@Ctx() { req }: MyContext,
		@Arg('limit', () => Int) limit: number,
		@Arg('cursor', () => String, { nullable: true }) cursor: string | null,
	): Promise<PaginatedPosts> {
		const { userId } = req.session!;
		const realLimit = Math.min(50, limit);
		const realLimitPlusOne = realLimit + 1;

		const replacements: any[] = [realLimitPlusOne];
		if (userId) replacements.push(userId);
		let cursorIdx = 2;
		if (cursor) {
			replacements.push(new Date(parseInt(cursor)));
			cursorIdx = replacements.length;
		}
		const posts = await getConnection().query(
			`select p.*, 
			json_build_object(
				'id',u.id,
				'username',u.username,
				'email',u.email,
				'updatedAt',u."updatedAt",
				'createdAt',u."createdAt") creator ,
		${
			userId
				? '(select v.value from vote v where "userId"=$2 and "postId"=p.id) '
				: 'null as'
		}	"voteStatus"
			from post p
			INNER JOIN public.user u ON p."creatorId" = u.id
			${cursor ? `where p."createdAt" < $${cursorIdx}` : ''}
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
	post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
		return Post.findOne(id, { relations: ['creator'] });
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
	@UseMiddleware(isAuth)
	async updatePost(
		@Arg('id', () => Int) id: number,
		@Arg('title') title: string,
		@Arg('text') text: string,
		@Ctx() { req }: MyContext,
	): Promise<Post | undefined> {
		const result = await getConnection()
			.createQueryBuilder()
			.update(Post)
			.set({ title, text })
			.where('id = :id and "creatorId" = :creatorId', {
				id,
				creatorId: req.session!.userId,
			})
			.returning('*')
			.execute();
		return result.raw[0];
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deletePost(
		@Arg('id', () => Int) id: number,
		@Ctx() { req }: MyContext,
	): Promise<boolean> {
		try {
			await Post.delete({ id, creatorId: req.session!.userId });
		} catch (error) {
			return false;
		}

		return true;
	}
}
