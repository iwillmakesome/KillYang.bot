import { Request, Response } from 'express';
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 44444;

// 개발 환경일 때만 dotenv 사용
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const API_URL = process.env.API_URL || `http://localhost:${PORT}/api`;

// discord bot
const bot = require('./bot/bot');
bot.startBot();

app.use('/api', require('./routers/api'));

app.use(express.static(path.join(__dirname, '../dist'))); // 빌드 폴더 경로
app.use(express.static(path.join(__dirname, '../public'))); // public 폴더 경로

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'), {
    headers: {
      API_URL: API_URL, // API_URL을 헤더로 추가
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
