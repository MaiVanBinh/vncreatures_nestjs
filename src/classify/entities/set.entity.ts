import { BaseClassify } from 'src/entities/BaseClassify.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Species } from './species.entity';
import { Group } from './group.entity';
import { Family } from './family.entity';

@Entity({
  name: 'orders',
})
export class Set extends BaseClassify {
  @ManyToOne(() => User, (user) => user.setCreated)
  @JoinColumn({
    name: 'created_by',
  })
  created_by: User;

  @ManyToOne(() => User, (user) => user.setUpdated)
  @JoinColumn({
    name: 'updated_by',
  })
  updated_by: User;

  @ManyToOne(() => Group, (group) => group.setsBelong)
  @JoinColumn({
    name: 'group',
  })
  group: Group;

  @OneToMany(() => Family, (family) => family.set)
  familiesBelong: Group[];
}
