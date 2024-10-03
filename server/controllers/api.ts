import {
  getKillLog,
  getDeathCount,
  getLastDeath,
  saveLastDeath,
} from '../models/api';

import { Request, Response } from 'express';
import { formatDate } from '../utils/utils';

export const saveLastDeathController = async (req: Request, res: Response) => {
  const { killer, avatar, reason } = req.body;
  await saveLastDeath(killer, avatar, reason);
  res.send(200);
};

export const getLastDeathController = async (req: Request, res: Response) => {
  const data = await getLastDeath();
  if (!data || data == null) {
    res.sendStatus(404);
  } else {
    const lastDeath = formatDate(data);
    res.status(200).json(lastDeath);
  }
};

export const getDeathCountController = async (req: Request, res: Response) => {
  const data = await getDeathCount();

  res.status(200).json(data); // 200 상태와 함께 17을 전송
};

export const getKillLogController = async (req: Request, res: Response) => {
  const data = await getKillLog();

  if (!data) {
    return res.sendStatus(404);
  }
  data.map((d: any) => {
    d.date = formatDate(d.date);
  });
  res.status(200).json(data);
};
