// sqlite DB 생성
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./deathOfYBG.db');
import { formatDate } from '../utils/utils';

type TableDataType = {
  id: string;
  killer: string;
  date: string;
  reason: string;
};

// SQLite DB 생성 및 테이블 생성
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS deathOfYBG (id INTEGER PRIMARY KEY AUTOINCREMENT, killer TEXT, date TEXT, reason TEXT, avatar TEXT)',
    (err: Error) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log("Table 'deathOfYBG' created or already exists.");
      }
    }
  );
});

export const saveLastDeath = async (
  killer: string,
  avatar: string,
  reason: string
) => {
  // 현재 날짜를 ISO 문자열로 저장
  const currentDate = new Date().toISOString();

  // 날짜 삽입
  const stmt = db.prepare(
    'INSERT INTO deathOfYBG (killer, avatar, date, reason) VALUES (?, ?, ?, ?)'
  );
  stmt.run([killer, avatar, currentDate, reason], function (err: Error) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`YBG is Killed on ${formatDate(currentDate)}`);
  });
  stmt.finalize();
};

export const getLastDeath = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT date FROM deathOfYBG ORDER BY id DESC LIMIT 1',
      (err: Error, row: { date: string }) => {
        if (err) {
          return reject(err);
        }
        if (row) {
          console.log(`deathOfYBG: ${formatDate(row.date)}`);
          resolve(row.date); // 마지막 죽은 날짜를 반환
        } else {
          resolve(null); // 데이터가 없는 경우
        }
      }
    );
  });
};

export const getDeathCount = async (): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT COUNT(*) AS count FROM deathOfYBG',
      (err: Error, row: { count: number }) => {
        if (err) {
          return reject(err);
        }
        console.log(`YBG was Killed ${row.count} times`);
        resolve(row.count); // 죽은 횟수를 반환
      }
    );
  });
};

export const getKillLog = async (): Promise<Array<TableDataType>> => {
  return new Promise((resolve, reject) => {
    db.all(
      /* sql */ `
        SELECT
          *
        FROM
          deathOfYBG
        ORDER BY
          id DESC
        LIMIT
          15;
      `,
      (err: Error, row: any) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      }
    );
  });
};
