// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild as typeDef } from 'discord.js';
import { Guild } from '../entities/Guild'
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';

export default class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }

  async run(_client: DiscordClient, guild: typeDef) {
    try {
      console.log(`➜ Bot joined Guild: ${guild.id}, Name: ${guild.name}`)

      await Guild.insert({ guildId: guild.id })
    } catch (e) {
      console.log(e)
    }
  }
}