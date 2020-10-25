import { Message } from 'discord.js'
import BaseCommand from '../../utils/structures/BaseCommand'
import DiscordClient from '../../client/client'
import { botInviteLink } from '../../events/ready/ready'

let cooldown: number

export default class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'Utils', [])
  }

  async run(client: DiscordClient, message: Message, _args: Array<string>) {
    if (cooldown && cooldown > Date.now() - 5 * 1000) {
      message.delete({ timeout: 1000 })
      const cooldownmsg = await message.channel.send('Command on Cooldown')

      cooldownmsg.delete({ timeout: 2000 })
      return
    }
    const embed = {
      color: 'random',
      title: `Commands`,
      description: `[Invite Me](${botInviteLink})`,
      fields: [
        {
          name: '# Accounts',
          value:
            '`$add` ➜ Add an Account to the Bot.',
        },
        {
          name: '# Miscellaneous',
          value:
            '`$help` ➜ Show a List of commands\n`$ping` ➜ Pong\n`$serverinfo` ➜ Show Server Information*\n`$uptime` ➜ Show Uptime from Bot',
        },
      ],
      footer: {
        text: `Commands with * will be Added soon.`,
        icon_url: client.user?.displayAvatarURL({ dynamic: true, size: 128 }),
      },
    }

    message.channel.send({ embed })
    cooldown = Date.now()
  }
}
