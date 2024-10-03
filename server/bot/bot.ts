import { messageHandler } from './message';
import { createCommands, interactionHandler } from './interaction';

exports.startBot = () => {
  const { Client, GatewayIntentBits } = require('discord.js');

  const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
  const client = new Client({
    intents: [Guilds, GuildMessages, MessageContent],
  });

  client.login(process.env.token);

  client.once('ready', () => {
    console.log(client.user?.tag + ' ready!');
    createCommands(client);
  });

  // message detection
  client.on('messageCreate', messageHandler);

  // slash commend response
  client.on('interactionCreate', interactionHandler);
};
