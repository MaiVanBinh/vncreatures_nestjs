import { IsEmail, IsPhoneNumber } from 'class-validator';
import { BaseEntity } from 'src/entities/BaseColumnSchemaPart.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  @IsPhoneNumber()
  phone: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    nullable: true,
  })
  web?: string;

  @Column({
    nullable: true,
  })
  desc?: string;

  @ManyToOne(() => User, (user) => user.authorCreated)
  @JoinColumn({
    name: 'created_by',
  })
  created_by: User;

  @ManyToOne(() => User, (user) => user.authorUpdated)
  @JoinColumn({
    name: 'created_by',
  })
  updated_by: User;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
