import { ApiProperty } from '@nestjs/swagger';
import { Item, ItemsOnOrders, Order, OrderStatus } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { ItemEntity } from 'src/items/entities/item.entity';

export class OrderEntity implements Order {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @Type(() => ItemsOnOrdersEntity)
  items: ItemsOnOrders[];

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}

export class ItemsOnOrdersEntity implements ItemsOnOrders {
  @Exclude()
  orderId: number;

  @Exclude()
  itemId: number;

  @Exclude()
  @Type(() => Date)
  createdAt: Date;

  @Exclude()
  @Type(() => Date)
  updatedAt: Date;

  @Type(() => ItemEntity)
  item: Item;

  @Type(() => OrderEntity)
  order: Order;

  constructor(partial: Partial<ItemsOnOrdersEntity>) {
    Object.assign(this, partial);
  }
}
