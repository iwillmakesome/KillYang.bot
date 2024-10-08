import { getUserNickname, formatDate } from '../utils/utils';
import { getLastDeath, getDeathCount, saveLastDeath } from '../models/api';
import { Message } from 'discord.js';

export const messageHandler = async (msg: Message) => {
  const content = msg.content;
  const nickname = getUserNickname(msg.author);
  const avatarURL = msg.author.displayAvatarURL({
    size: 1024,
  });

  if (content == ':emoji_3:' || content == '<:emoji_3:877020440093163601>') {
    const lastDeats = await getLastDeath();
    if (lastDeats) {
      msg.reply(
        `RIP 양범건 (2002.12.26 ~ ${formatDate(lastDeats)})\n\n[KillYang.bot](https://united-lorrayne-illmks-c2ae8082.koyeb.app/)에서 더 많은 정보를 확인할 수 있어요.`
      );
    }
    return;
  }

  if (content == '죽어') {
    msg.reply(`당신은 양범건을 죽였습니다. RIP 양범건`);
    await saveLastDeath(nickname, avatarURL, '그냥');

    return;
  }

  if (content.includes('죽어') && msg.member?.nickname) {
    msg.reply(`당신은 양범건을 죽였습니다. RIP 양범건`);
    await saveLastDeath(nickname, avatarURL, content);
    return;
  }

  if (content == '양범건 죽은 횟수') {
    const deathCount = await getDeathCount();
    msg.reply(
      `양범건은 지금까지 ${deathCount}번 죽었습니다.\n\n[KillYang.bot](https://united-lorrayne-illmks-c2ae8082.koyeb.app/)에서 더 많은 정보를 확인할 수 있어요.`
    );
    return;
  }
};
