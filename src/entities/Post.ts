import { Field, Int, ObjectType } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { User } from './User';
import { Vote } from './Vote';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	title!: string;

	@Field()
	@Column()
	text!: string;

	@Field()
	@Column({ type: 'int', default: 0 })
	points!: number;

	@Field(() => Int, { nullable: true })
	voteStatus: 1 | -1 | null;

	@Field()
	@Column()
	creatorId: number;

	@Field()
	@ManyToOne(() => User, user => user.posts)
	creator: User;

	@OneToMany(() => Vote, vote => vote.user)
	votes: Vote[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
