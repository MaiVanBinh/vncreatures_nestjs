import { BaseClassifyRaw } from 'src/entities/BaseClassify.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class Species extends BaseClassifyRaw {
  @Column()
  name_en: string;

  @ManyToOne(() => User, (user) => user.speciesCreated)
  @JoinColumn({
    name: 'created_by',
  })
  created_by: User;

  @ManyToOne(() => User, (user) => user.speciesUpdated)
  @JoinColumn({
    name: 'updated_by',
  })
  updated_by: User;

  @OneToMany(() => Group, (group) => group.species)
  groupsBelong: Group[];
}
