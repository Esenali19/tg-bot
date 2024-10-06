import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
