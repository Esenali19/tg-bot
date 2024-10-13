import { Update, Ctx, Start, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(private botService: BotService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    if ('from' in ctx.message) {
      const { id } = ctx.message.from;
      const user = await this.botService.addUser(id.toString());
      await ctx.reply(`Welcome! You've been added to our user database.`);
    }
  }

  @Command('addpermission')
  async addPermission(@Ctx() ctx: Context) {
    if ('from' in ctx.message && 'text' in ctx.message) {
      const { id } = ctx.message.from;
      const [, permissionName] = ctx.message.text.split(' ');
      
      if (!permissionName) {
        await ctx.reply('Please provide a permission name.');
        return;
      }

      const user = await this.botService.addUser(id.toString(), ctx.message.from.username);
      await this.botService.addPermission(user.id, permissionName);
      await ctx.reply(`Permission "${permissionName}" has been added to your account.`);
    }
  }
}