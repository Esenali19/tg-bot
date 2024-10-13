import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ItemsModule, PrismaModule, OrdersModule, UsersModule, BotModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    TelegrafModule.forRoot({
      token: '7389975739:AAGucmd_J3dwwveq9fIuoEIwZ9RAHxf4EKA',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
