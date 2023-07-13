import { BaseClassify } from 'src/entities/BaseClassify.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Species } from './species.entity';
import { Group } from './group.entity';
import { Set } from './set.entity';

@Entity({
  name: 'families',
})
export class Family extends BaseClassify {
  @ManyToOne(() => User, (user) => user.familyCreated)
  @JoinColumn({
    name: 'created_by',
  })
  created_by: User;

  @ManyToOne(() => User, (user) => user.familyUpdated)
  @JoinColumn({
    name: 'updated_by',
  })
  updated_by: User;

  @ManyToOne(() => Set, (set) => set.familiesBelong)
  @JoinColumn({
    name: 'order',
  })
  set: Set;
}
