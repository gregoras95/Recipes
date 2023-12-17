import { Optional } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { Role } from 'src/models/roles.enum';
import { Recipe } from 'src/recipe/recipe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];

}
