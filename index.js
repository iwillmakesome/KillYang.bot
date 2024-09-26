const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
} = require("discord.js");
const { healthCheck } = require("./healthCheck");
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });

require("dotenv").config();
client.login(process.env.token);
client.once("ready", () => {
  console.log(client.user.tag + " ready!");
  client.application.commands.create(
    new SlashCommandBuilder().setName("test").setDescription("test")
  );
});

client.on("messageCreate", (msg) => {
  const content = msg.content;

  if (content == ":emoji_3:" || content == "<:emoji_3:877020440093163601>") {
    msg.reply("죽어 양범건ㅋ");
  }
});

//// healthCheck
const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const port = process.env.PORT || 44444;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
