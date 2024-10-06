import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the item' })
  name: string;

  @IsNumber()
  @ApiProperty()
  quantity: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;
}