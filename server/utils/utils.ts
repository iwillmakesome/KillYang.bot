import { User } from 'discord.js';

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const getUserNickname = (user: User): string => {
  if (user.username) {
    return user.username;
  } else {
    return 'unknown';
  }
};
