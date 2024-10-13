import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from 'src/users/dto/create-permission.dto';

@Injectable()
export class BotService {
  constructor(private prisma: PrismaService) {}

  async addUser(telegramId: string, username: string | undefined) {
    const user = await this.prisma.user.upsert({
      where: { telegramId },
      update: { username },
      create: { telegramId, username },
    });
    return user;
  }

  async createPermission(createPermissionDto: CreatePermissionDto) {
    return await this.prisma.premission.create({
      data: createPermissionDto,
    });
  }

  async addPermissionToUser(userId: number, permissionId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        permissions: {
          connect: { id: permissionId },
        },
      },
    });
  }
}