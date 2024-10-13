import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    telegramId: string;
  
    @IsString()
    @IsOptional()
    username?: string;
  }
