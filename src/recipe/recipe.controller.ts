import { ClassSerializerInterceptor, Controller,Body,  Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) { }
  
  @Post('/create')
  async createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    const report= await this.recipeService.create(createRecipeDto);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getRecipe() { }
  
  @Patch('/:id')
  approveReport() {}

}
