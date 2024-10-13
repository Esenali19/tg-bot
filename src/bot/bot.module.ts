import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { BotUpdate } from './bot.update';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BotController],
  providers: [BotService, PrismaService, BotUpdate],
})
export class BotModule {}
