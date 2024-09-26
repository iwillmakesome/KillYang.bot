const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
} = require("discord.js");
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });

// sqlite DB 생성
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./LastDeath.db");

// dotenv 업로드 하면 지워주기
require("dotenv").config();

client.login(process.env.token);
client.once("ready", () => {
  // SQLite DB 생성 및 테이블 생성
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS lastDeath (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT)",
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Table 'lastDeath' created or already exists.");
        }
      }
    );
  });

  console.log(client.user.tag + " ready!");
  client.application.commands.create(
    new SlashCommandBuilder()
      .setName("kill")
      .setDescription("양범건을 죽이고싶나요?")
  );
  client.application.commands.create(
    new SlashCommandBuilder()
      .setName("deathcount")
      .setDescription("양범건이 몇 번 죽었는지 확인할 수 있어요.")
  );
  client.application.commands.create(
    new SlashCommandBuilder()
      .setName("lastdeath")
      .setDescription("죽은 양범건을 기리며...")
  );
});

client.on("messageCreate", async (msg) => {
  const content = msg.content;

  if (content == ":emoji_3:" || content == "<:emoji_3:877020440093163601>") {
    const lastDeats = await getLastDeath();
    msg.reply(`RIP 양범건 (2002.12.26 ~ ${formatDate(lastDeats)})`);
  }

  if (
    content.includes("죽어 양범건") ||
    content.includes("양범건 죽어") ||
    content.includes("죽어")
  ) {
    msg.reply(`당신은 양범건을 죽였습니다. RIP 양범건`);
    await setLastDeath();
  }

  if (content == "양범건 죽은 횟수") {
    const deathCount = await getDeathCount();
    msg.reply(`양범건은 지금까지 ${deathCount}번 죽었습니다.`);
  }
});

// DB에 마지막으로 죽인 날짜 저장할꺼임
const setLastDeath = async () => {
  // 현재 날짜를 ISO 문자열로 저장
  const currentDate = new Date().toISOString();

  // 날짜 삽입
  const stmt = db.prepare("INSERT INTO lastDeath (date) VALUES (?)");
  stmt.run(currentDate, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`YBG is Killed on ${formatDate(currentDate)}`);
  });
  stmt.finalize();
};

const getLastDeath = async () => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT date FROM lastDeath ORDER BY id DESC LIMIT 1",
      (err, row) => {
        if (err) {
          return reject(err);
        }
        if (row) {
          console.log(`lastDeath: ${formatDate(row.date)}`);
          resolve(row.date); // 마지막 죽은 날짜를 반환
        } else {
          resolve(null); // 데이터가 없는 경우
        }
      }
    );
  });
};

const getDeathCount = async () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) AS count FROM lastDeath", (err, row) => {
      if (err) {
        return reject(err);
      }
      console.log(`YBG was Killed ${row.count} times`);
      resolve(row.count); // 죽은 횟수를 반환
    });
  });
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

// slash commend response
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  console.log("/" + commandName);

  if (commandName === "deathcount") {
    try {
      const deathCount = await getDeathCount();
      await interaction.reply(`양범건은 지금까지 ${deathCount}번 죽었습니다.`);
    } catch (err) {
      console.log("deathcount err");
    }
  }

  if (commandName === "lastdeath") {
    try {
      const lastDeats = await getLastDeath();
      await interaction.reply(
        `RIP 양범건 (2002.12.26 ~ ${formatDate(lastDeats)})`
      );
    } catch (err) {
      console.log("lasedeath err");
    }
  }

  if (commandName === "kill") {
    try {
      await setLastDeath();
      await interaction.reply(`당신은 양범건을 죽였습니다. RIP 양범건`);
    } catch (err) {
      console.log("kill err");
    }
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
