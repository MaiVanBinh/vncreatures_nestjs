import { Creature } from 'src/creatures/entities/creature.entity';
import { BaseEntity } from 'src/entities/BaseColumnSchemaPart.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Asset extends BaseEntity {
  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  source: string;

  @Column()
  mime_type: string;

  @Column()
  size: number;

  @ManyToMany(() => Post)
  @JoinTable()
  posts: Post[];

  @ManyToMany(() => Creature)
  @JoinTable()
  creatures: Creature[];

  @ManyToOne(() => User, (user) => user.assetsCreated)
  @JoinColumn({
    name: 'created_by',
  })
  created_by: User;

  @ManyToOne(() => User, (user) => user.assetsUpdated)
  @JoinColumn({
    name: 'updated_by',
  })
  updated_by: User;
}
