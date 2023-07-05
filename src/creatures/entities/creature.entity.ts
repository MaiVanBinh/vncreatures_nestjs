import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'creatures'})
export class Creature {
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

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date
}
