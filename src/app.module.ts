import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ItemsModule, PrismaModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
