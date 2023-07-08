import { Exclude, Expose } from 'class-transformer';
import { Asset } from 'src/asset/entities/asset.entity';
import { Family } from 'src/classify/entities/family.entity';
import { Author } from 'src/author/entities/author.entity';
import { Group } from 'src/classify/entities/group.entity';
import { Set } from 'src/classify/entities/set.entity';
import { Species } from 'src/classify/entities/species.entity';
import { Creature } from 'src/creatures/entities/creature.entity';
import { Post } from 'src/post/entities/post.entity';
import { PostCategory } from 'src/postCategory/entities/postCategory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';

export enum UserRole {
  ADMIN = '2',
  EDITOR = '1',
  GHOST = '0',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST,
  })
  role: UserRole;

  @Column('varchar', { length: 20 })
  username: string;

  @Expose()
  get fullName(): string {
    return `${this.username} ${this.username}`;
  }

  @Column('varchar', { length: 100 })
  @Exclude()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @Column('integer')
  created_by: number;

  @Column('integer')
  updated_by: number;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @ManyToOne('User', 'User')
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdUser: User;

  @ManyToOne('User', 'User')
  @JoinColumn([
    {
      name: 'updated_by',
      referencedColumnName: 'id',
    },
  ])
  updatedUser: User;

  @Column({
    unique: true,
  })
  @IsOptional()
  refresh_token: string;

  // @OneToMany(() => Post, (post) => post.category)
  // posts: Post[];

  @OneToMany(() => Creature, (creature) => creature.updated_by)
  creaturesUpdated: Creature[];

  @OneToMany(() => Creature, (creature) => creature.created_by)
  creaturesCreated: Creature[];

  @OneToMany(() => Author, (author) => author.created_by)
  authorCreated: Author[];

  @OneToMany(() => Author, (author) => author.updated_by)
  authorUpdated: Author[];

  @OneToMany(() => PostCategory, (postCategory) => postCategory.created_by)
  postCategoriesCreated: PostCategory[];

  @OneToMany(() => PostCategory, (postCategory) => postCategory.updated_by)
  postCategoriesUpdated: PostCategory[];

  // @OneToMany(() => Post, (post) => post.created_by)
  // postsCreated: Post[];

  // @OneToMany(() => Post, (post) => post.updated_by)
  // postsUpdated: Post[];

  @OneToMany(() => Asset, (asset) => asset.created_by)
  assetsCreated: Post[];

  @OneToMany(() => Asset, (asset) => asset.updated_by)
  assetsUpdated: Asset[];

  @OneToMany(() => Species, (species) => species.created_by)
  speciesCreated: Species[];

  @OneToMany(() => Species, (species) => species.updated_by)
  speciesUpdated: Species[];

  @OneToMany(() => Group, (group) => group.created_by)
  groupsCreated: Group[];

  @OneToMany(() => Group, (group) => group.updated_by)
  groupsUpdated: Group[];

  @OneToMany(() => Set, (set) => set.created_by)
  setCreated: Set[];

  @OneToMany(() => Set, (set) => set.updated_by)
  setUpdated: Set[];

  @OneToMany(() => Family, (family) => family.created_by)
  familyCreated: Family[];

  @OneToMany(() => Family, (family) => family.updated_by)
  familyUpdated: Family[];
}
