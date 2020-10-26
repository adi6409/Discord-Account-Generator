import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { PermissionType } from '../../enums/PermissionType';
import { EmbedColor } from '../../enums/EmbedColor';
import { AccountType } from '../../enums/AccountType';
import { Account } from '../../entities/Account';

let cooldown: number;

export default class GetCommand extends BaseCommand {
  constructor() {
    super('get', 'Accounts', []);
  }

  async run(_client: DiscordClient, message: Message, args: Array<string>) {
    if (cooldown && cooldown > Date.now() - 5 * 3000) {
      message.delete({ timeout: 1000 })
      const cooldownmsg = await message.channel.send('Command on Cooldown')

      cooldownmsg.delete({ timeout: 2000 })
      return
    }

    if (!message.guild?.me?.hasPermission(PermissionType.MANAGE_MESSAGES)) {
      message.channel.send(`Missing Permission: ${PermissionType.MANAGE_MESSAGES}`)
      return
    }

    if (!args.length) {
      message.channel.send(`${message.author}`, {
        embed: {
          hexColor: EmbedColor.DEFAULT,
          fields: [
            {
              name: 'Account Types*',
              value: `Possible Types: rust, spotify, csgo`,
            },
          ],
          footer: {
            text: '* fields are required.',
          }
        }
      })
      return
    }

    cooldown = Date.now()

    const type = args[0];

    if (!(type in AccountType)) {
      const botMsg = await message.channel.send(`${message.author}`, {
        embed: {
          fields: [
            {
              name: 'Incorrect Account Type',
              value: `Possible Types: rust, spotify, csgo`,
            }
          ]
        }
      })

      message.delete({ timeout: 5000 });
      botMsg.delete({ timeout: 6500 });
      return
    }

    const msg = await message.channel.send(`trying to find a account in ${type} category...`, { reply: message.author })

    const acc = await Account.findOne({ where: { category: type, active: false } })

    if (!acc) {
      message.delete({ timeout: 2500 })
      msg.edit('No Account Found, check the $stock for Accounts.');
      msg.delete({ timeout: 2500 })
      return;
    }

    msg.edit('Found an Account, sent you a DM!')

    message.author.send('', {
      embed: {
        fields: [{
          name: '# Account Information',
          value: `Username: \`${acc.username}\`\nPassword: \`${acc.password}\``,
        }]
      }
    });

    message.delete({ timeout: 4000 })
    msg.delete({ timeout: 4000 })

    Account.update({ id: acc.id }, { active: true });
  }
}