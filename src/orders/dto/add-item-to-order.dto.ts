import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddItemToOrderDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  itemId: number;
}
