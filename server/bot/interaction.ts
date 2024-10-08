import { formatDate, getUserNickname } from '../utils/utils';
import { getLastDeath, getDeathCount, saveLastDeath } from '../models/api';
import { Interaction, Client, SlashCommandBuilder } from 'discord.js';

export const createCommands = async (client: Client) => {
  // create slash command
  client.application?.commands.create(
    new SlashCommandBuilder()
      .setName('kill')
      .setDescription('양범건을 죽이고싶나요? [사유를 적어주세요]')
      .addStringOption((option) =>
        option.setName('reason').setDescription('사유').setRequired(false)
      )
  );
  client.application?.commands.create(
    new SlashCommandBuilder()
      .setName('deathcount')
      .setDescription('양범건이 몇 번 죽었는지 확인할 수 있어요.')
  );
  client.application?.commands.create(
    new SlashCommandBuilder()
      .setName('lastdeath')
      .setDescription('죽은 양범건을 기리며...')
  );
};

export const interactionHandler = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const nickname = getUserNickname(interaction.user);
  const avatarURL = interaction.user.displayAvatarURL({
    size: 1024,
  });
  const { commandName, options } = interaction;

  console.log('/' + commandName, options.get('reason'));

  if (commandName === 'deathcount') {
    try {
      const deathCount = await getDeathCount();
      await interaction.reply(
        `양범건은 지금까지 ${deathCount}번 죽었습니다.\n\n[KillYang.bot](https://united-lorrayne-illmks-c2ae8082.koyeb.app/)에서 더 많은 정보를 확인할 수 있어요.`
      );
    } catch (err) {
      console.log('deathcount err');
    }
  }

  if (commandName === 'lastdeath') {
    try {
      const lastDeats = await getLastDeath();
      if (lastDeats) {
        await interaction.reply(
          `RIP 양범건 (2002.12.26 ~ ${formatDate(lastDeats)})\n\n[KillYang.bot](https://united-lorrayne-illmks-c2ae8082.koyeb.app/)에서 더 많은 정보를 확인할 수 있어요.`
        );
      }
    } catch (err) {
      console.log('lasedeath err');
    }
  }

  if (commandName === 'kill') {
    try {
      const reason = options.get('reason');
      if (reason) {
        await saveLastDeath(
          nickname,
          avatarURL,
          `${options.get('reason')?.value}`
        );
        await interaction.reply(`당신은 양범건을 죽였습니다. 사유 : ${reason}`);
      } else {
        await saveLastDeath(nickname, avatarURL, '그냥');
        await interaction.reply(`당신은 양범건을 죽였습니다. 사유 : 그냥`);
      }
    } catch (err) {
      console.log('kill err');
    }
  }
};
