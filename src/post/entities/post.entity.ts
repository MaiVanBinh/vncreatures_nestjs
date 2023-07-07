import { Asset } from 'src/asset/entities/asset.entity';
import { Author } from 'src/author/entities/author.entity';
import { BaseEntity } from 'src/entities/BaseColumnSchemaPart.entity';
import { PostCategory } from 'src/postCategory/entities/postCategory.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Language {
  VN = 'vn',
  EN = 'en',
}

@Entity({
  name: 'posts',
})
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => PostCategory, (postCategory) => postCategory.posts)
  @JoinColumn({
    name: 'category',
  })
  category: PostCategory;

  @ManyToOne(() => Author, (author) => author.posts)
  @JoinColumn({
    name: 'author',
  })
  author: Author;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.VN,
  })
  language: Language;

  @Column()
  description: string;

  @ManyToMany(() => Post)
  @JoinTable()
  assets: Asset[];

  // @ManyToOne(() => User, (user) => user.postsCreated)
  // @JoinColumn({
  //   name: 'created_by',
  // })
  // created_by: User;

  // @ManyToOne(() => User, (user) => user.postsUpdated)
  // @JoinColumn({
  //   name: 'created_by',
  // })
  // updated_by: User;
}
