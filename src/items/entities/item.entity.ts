import { ApiProperty } from '@nestjs/swagger';
import { Item } from '@prisma/client';

export class ItemEntity implements Item {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<ItemEntity>) {
    Object.assign(this, partial);
  }
}
