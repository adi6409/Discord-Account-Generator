declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    DISCORD_TOKEN: string;
    BOT_PREFIX: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    ACCOUNT_CHANNEL: string;
  }
}
