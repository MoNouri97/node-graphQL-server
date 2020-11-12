import { Field, Int, ObjectType } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
	@Column({ type: 'int' })
	value: number;

	@Field()
	@PrimaryColumn()
	userId: number;

	@Field()
	@PrimaryColumn()
	postId: number;

	@Field(() => User)
	@ManyToOne(() => User, user => user.votes)
	user: User;

	@Field(() => Post)
	@ManyToOne(() => Post, post => post.votes)
	post: Post;
}
