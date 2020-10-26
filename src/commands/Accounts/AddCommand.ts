import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { PermissionType } from '../../enums/PermissionType';
import { AccountType } from '../../enums/AccountType';
import { IAccount } from '../../interface/Account';
import { Account } from '../../entities/Account';
import { EmbedColor } from '../../enums/EmbedColor';

let cooldown: number;

export default class AddCommand extends BaseCommand {
  constructor() {
    super('add', 'Accounts', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (cooldown && cooldown > Date.now() - 5 * 3000) {
      message.delete({ timeout: 1000 })
      const cooldownmsg = await message.channel.send('Command on Cooldown')

      cooldownmsg.delete({ timeout: 2000 })
      return
    }

    const channel = await client.channels.cache.get(process.env.ACCOUNT_CHANNEL)

    if (message.channel.id !== process.env.ACCOUNT_CHANNEL && typeof channel !== 'undefined') {
      message.delete()

      message.channel.send(`${message.author}, you can only add Accounts in ${channel ?? 'Unknown'}`).then(m => m.delete({ timeout: 4500 }))
      return
    }

    if (!message.member?.hasPermission(PermissionType.ADMINISTRATOR)) {
      message.channel.send('You\'re not an Admin!');
      return
    }

    if (!message.guild?.me?.hasPermission(PermissionType.MANAGE_MESSAGES)) {
      message.channel.send(`Missing Permission: ${PermissionType.MANAGE_MESSAGES}`)
      return
    }

    if (!args.length) {
      message.channel.send(`${message.author}`, {
        embed: {
          color: EmbedColor.DEFAULT,
          fields: [
            {
              name: 'Account Types*',
              value: `Possible Types: rust, spotify, csgo`,
            },
            {
              name: 'Username*',
              value: 'Username to Login',
            },
            {
              name: 'Password*',
              value: 'Password to Login',
            },
          ],
          footer: {
            text: '* fields are required.',
          }
        }
      })
      return
    }

    const type = args[0];
    const username = args[1];
    const password = args[2];

    cooldown = Date.now()


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

    if (typeof username === 'undefined') {
      message.delete()
      message.channel.send(`${message.author}`, {
        embed: {
          fields: [{
            name: 'Username',
            value: 'Please specify a Username.'
          }]
        }
      }).then(m => m.delete({ timeout: 5000 }));
      return
    }

    if (typeof password === 'undefined') {
      message.delete()
      message.channel.send(`${message.author}`, {
        embed: {
          fields: [{
            name: 'Password',
            value: 'Please specify a Password.'
          }]
        }
      }).then(m => m.delete({ timeout: 5000 }))
      return
    }

    const newAcc: IAccount = {
      username,
      password,
      category: <AccountType>type,
    }


    await Account.insert(newAcc).then(() => {
      message.author.send(`Account ${newAcc.username} was added to the Database.`).catch((e) => console.log(e));
    }).catch((e) => {
      console.log(e.message);
      message.author.send(`Something went wrong... ${newAcc.username} wasnt added to the Database.`)
    });
  }
}