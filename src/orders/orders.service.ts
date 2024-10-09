import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private itemsService: ItemsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({ data: createOrderDto });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (order) {
      return this.prisma.order.delete({ where: { id } });
    }
  }

  async addItemToOrder(orderId: number, itemId: number) {
    const order = await this.findOne(orderId);
    const item = await this.itemsService.findOne(itemId);
    return this.prisma.itemsOnOrders.create({
      data: {
        orderId: orderId,
        itemId: itemId,
      },
    });
  }

  async removeItemFromOrder(orderId: number, itemId: number) {
    const order = await this.findOne(orderId);
    const item = await this.itemsService.findOne(itemId);
    return this.prisma.itemsOnOrders.delete({
      where: {
        orderId_itemId: {
          orderId,
          itemId,
        },
      },
    });
  }
}
