const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
} = require("discord.js");
const { healthCheck } = require("./healthCheck");
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });

// dotenv 업로드 하면 지워주기
// require("dotenv").config();
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
    const today = new Date();

    // 연도, 월, 일을 추출합니다.
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    const day = String(today.getDate()).padStart(2, "0");

    // 형식화된 날짜 문자열을 생성합니다.
    const formattedDate = `${year}.${month}.${day}`;
    msg.reply(`RIP 양범건 (2002.12.26 ~ ${formattedDate}`);
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
