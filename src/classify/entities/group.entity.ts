import { BaseClassify } from 'src/entities/BaseClassify.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Species } from './species.entity';
import { Set } from './set.entity';

@Entity()
export class Group extends BaseClassify {
  @ManyToOne(() => User, (user) => user.groupsCreated)
  @JoinColumn({
    name: 'created_by',
  })
  created_by: User;

  @ManyToOne(() => User, (user) => user.groupsUpdated)
  @JoinColumn({
    name: 'updated_by',
  })
  updated_by: User;

  @ManyToOne(() => Species, (species) => species.groupsBelong)
  @JoinColumn({
    name: 'species',
  })
  species: Species;

  @OneToMany(() => Set, (set) => set.group)
  setsBelong: Set[];
}
