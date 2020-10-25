import { Message } from 'discord.js'
import BaseCommand from '../../utils/structures/BaseCommand'
import DiscordClient from '../../client/client'

let cooldown: number

export default class PingCommand extends BaseCommand {
    constructor() {
        super('ping', 'Utils', [])
    }

    async run(client: DiscordClient, message: Message, _args: Array<string>) {
        if (cooldown && cooldown > Date.now() - 5 * 3000) {
            message.delete({ timeout: 1000 })
            const cooldownmsg = await message.channel.send('Command on Cooldown')

            cooldownmsg.delete({ timeout: 2000 })
            return
        }
        const msg = await message.channel.send('Pinging...')

        const latency = msg.createdTimestamp - message.createdTimestamp

        msg.edit(
            `Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(
                client.ws.ping
            )}ms\``
        )

        cooldown = Date.now()
    }
}
