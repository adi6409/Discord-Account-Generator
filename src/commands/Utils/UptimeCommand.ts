import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { calculateUptime } from '../../utils/uptime'

let cooldown: number

export default class UptimeCommand extends BaseCommand {
  constructor() {
    super('uptime', 'Utils', []);
  }

  async run(client: DiscordClient, message: Message, _args: Array<string>) {
    const uptime = calculateUptime(client.uptime!)

    if (cooldown && cooldown > Date.now() - 5 * 3000) {
      message.delete({ timeout: 1000 })
      const cooldownmsg = await message.channel.send('Command on Cooldown')

      cooldownmsg.delete({ timeout: 2000 })
      return
    }
    message.channel.send({
      embed: {
        fields: [
          {
            name: 'Uptime',
            value: uptime
          }
        ]
      }
    })

    cooldown = Date.now()
  }
}