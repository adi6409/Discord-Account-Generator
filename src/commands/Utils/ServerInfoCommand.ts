import { Message } from 'discord.js'
import BaseCommand from '../../utils/structures/BaseCommand'
import DiscordClient from '../../client/client'

let cooldown: number

export default class ServerInfoCommand extends BaseCommand {
    constructor() {
        super('serverinfo', 'Utils', [])
    }

    async run(_client: DiscordClient, message: Message, _args: Array<string>) {
        if (cooldown && cooldown > Date.now() - 5 * 3000) {
            const cooldownmsg = await message.channel.send('Command on Cooldown')

            cooldownmsg.delete({ timeout: 2000 })
            return
        }

        const embed = {
            color: 'random',
            title: `${message.guild}'s Information`,
            description: '\u200b',
            thumbnail: {
                url: `${message.guild!.iconURL({ dynamic: true, size: 256 })}`,
            },
            fields: [
                {
                    name: '# Guild Owner',
                    value: message.guild!.owner,
                    inline: false,
                },
                {
                    name: '# Guild created',
                    value: `${message.guild!.createdAt.getMonth()}/${message.guild!.createdAt.getDay()}/${message.guild!.createdAt.getFullYear()}`,
                    inline: false,
                },
                {
                    name: '# Guild Region',
                    value: message.guild!.region,
                    inline: false,
                },
                {
                    name: '# Emoji Count',
                    value: message.guild!.emojis.cache.size,
                    inline: true,
                },
                {
                    name: '# Roles Count',
                    value: message.guild!.roles.cache.size,
                    inline: true,
                },
                {
                    name: '# Member Count',
                    value: message.guild!.memberCount,
                    inline: true,
                },
                // {
                //   name: '\u200b',
                //   value: '\u200b',
                //   inline: false,
                // },
            ],
            timestamp: Date.now()
        }

        message.channel.send({ embed })
        cooldown = Date.now()
    }
}
