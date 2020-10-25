import { config } from 'dotenv';
config();
import { registerCommands, registerEvents } from './utils/registry';
import DiscordClient from './client/client';
const client = new DiscordClient({});
import { createConnection } from "typeorm";
import { __prod__ } from './constants';
import { Account } from './entities/Account';
import { Guild } from './entities/Guild';

const main = async () => {
  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: !__prod__,
    synchronize: true,
    entities: [Account, Guild],
  });


  client.prefix = process.env.BOT_PREFIX || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login();
}
main().catch(e => console.log(e))