import { IsString } from "class-validator";

export class CreateRecipeDto {
  @IsString()
  id: number;

  @IsString()
  name: string;

  @IsString()
  ingredients: string;

  @IsString()
  instructions: string;

  @IsString()
  time: string;

  @IsString()
  difficulty: string;

  @IsString()
  size: string;
}