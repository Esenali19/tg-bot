import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemsService } from 'src/items/items.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, ItemsService],
})
export class OrdersModule {}
