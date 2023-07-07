import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseColumnSchemaPart.entity';

@Entity()
export abstract class BaseClassify extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_vn: string;

  @Column()
  name_latin: string;

  @Column()
  description: string;
}
