import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { User } from 'src/user/user.entity';


@Injectable()
export class RecipeService {
  constructor(@InjectRepository(Recipe) private repository: Repository<Recipe>) {}

  create(createRecipeDto: CreateRecipeDto) {
    const recipe = this.repository.create(createRecipeDto)
    return this.repository.save(recipe)
  }

  findById(id: number) {
    return this.repository.findOneById(id);
  }

  async changeApproval(id: string, approved: boolean) {
    const recipe = await this.repository.findOneById(id)
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    recipe.approved = approved;
    return this.repository.save(recipe)
  }

}
