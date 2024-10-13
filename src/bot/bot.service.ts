import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BotService {

  constructor(private prisma: PrismaService) {}

  async addUser(telegramId: string) {
    const user = await this.prisma.user.upsert({
      where: { telegramId },
      create: { telegramId },
    });
    return user;
  }

  async addPermission(userId: number, permissionName: string) {
    const permission = await this.prisma.permission.upsert({
      where: { name: permissionName },
      update: {},
      create: { name: permissionName },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        permissions: {
          connect: { id: permission.id },
        },
      },
    });
  }
}
