import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
export let botInviteLink = '';

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client: DiscordClient) {
    console.log(`➜ Bot ${client.user?.tag} has Successfully logged in`)

    client.user?.setActivity({
      type: 'LISTENING',
      name: '$help for more information',
    })

    client.generateInvite({
      permissions: ['ADMINISTRATOR'],
    })
      .then(link => {
        botInviteLink = link;
      })
      .catch(console.error);
  }
}