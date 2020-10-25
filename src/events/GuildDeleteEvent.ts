// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
import { Guild as typeDef } from 'discord.js'
import BaseEvent from '../utils/structures/BaseEvent'
import DiscordClient from '../client/client'
import { Guild } from '../entities/Guild'

export default class GuildDeleteEvent extends BaseEvent {
  constructor() {
    super('guildDelete')
  }

  async run(_client: DiscordClient, guild: typeDef) {
    try {
      console.log(`➜ Bot left Guild: ${guild.id}; Name: ${guild.name}`)

      await Guild.delete({ guildId: guild.id })
    } catch (e) {
      console.log(e)
    }
  }
}
