import { Exclude, Expose } from 'class-transformer';
import { Creature } from 'src/creatures/entities/creature.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @OneToMany((type) => Creature, (creature) => creature.created_by)
  creatures: Creature[];
}
