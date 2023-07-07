import { Asset } from 'src/asset/entities/asset.entity';
import { BaseEntity } from 'src/entities/BaseColumnSchemaPart.entity';
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

@Entity({ name: 'creatures' })
export class Creature extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_vn: string;

  @Column()
  name_latin: string;

  @Column()
  species: string;

  @Column()
  family: string;

  @Column()
  order: string;

  @Column()
  group: string;

  @Column()
  description: string;

  @Column()
  avatar: string;

  @Column()
  author: string;

  @Column()
  redbook_level: string;

  @ManyToOne(() => User, (user) => user.creaturesCreated)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User, (user) => user.creaturesUpdated)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @ManyToMany(() => Asset)
  @JoinTable()
  assets: Asset[];
}
