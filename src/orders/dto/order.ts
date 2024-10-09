import { OrderStatus } from '@prisma/client';
import { ItemOut } from 'src/items/dto/item';

export class OrderOut {
  id: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  items: ItemOut[];
}
