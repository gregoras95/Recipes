import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ingredients: string;

  @Column()
  instructions: string;

  @Column()
  time: string;

  @Column()
  difficulty: string;

  @Column()
  size: string;
  
  @Column( {default: false } )
  approved: boolean
  
  @ManyToOne(() => User, (user) => user.recipes)
  user: User;
}