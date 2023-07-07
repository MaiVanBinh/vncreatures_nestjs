import { BaseEntity } from 'src/entities/BaseColumnSchemaPart.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({
  name: 'posts_category',
})
@Tree('nested-set')
export class PostCategory extends BaseEntity {
  @Column()
  name_vn: string;

  @Column()
  name_en: string;

  @Column({
    default: 0,
  })
  list: number;

  @ManyToOne(() => User, (user) => user.postCategoriesCreated)
  @JoinColumn({
    name: 'created_by',
  })
  created_by: User;

  @ManyToOne(() => User, (user) => user.postCategoriesUpdated)
  @JoinColumn({
    name: 'updated_by',
  })
  updated_by: User;

  @TreeChildren()
  children: PostCategory[];

  @TreeParent()
  parent: PostCategory;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
