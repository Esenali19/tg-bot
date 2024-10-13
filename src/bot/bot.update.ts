import { Update, Ctx, Start, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(private botService: BotService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    if ('from' in ctx.message) {
      const { id, username } = ctx.message.from;
      const user = await this.botService.addUser(id.toString(), username);
      await ctx.reply(`Hello user with tg id ${user.telegramId} You've been added to our user database.`);
    }
  }
}