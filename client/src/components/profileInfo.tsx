import '@/styles/profileInfo.css';

import { useEffect, useState } from 'react';

export default function ProfileInfo() {
  const [deathCount, setDeathCount] = useState<number>(0);
  const [lastDeath, setLastDeath] = useState<string>('');

  const loadDate = async () => {
    const API_URL =
      document.querySelector('meta[name="API_URL"]')?.getAttribute('content') ??
      '';

    const countRes = await fetch(`${API_URL}/count`, {
      method: 'GET',
    });
    setDeathCount(await countRes.json());

    const lastRes = await fetch(`${API_URL}/last`, {
      method: 'GET',
    });
    setLastDeath(await lastRes.json());
  };

  useEffect(() => {
    loadDate();
  }, []);
  return (
    <>
      <div className='profileInfo'>
        <h1>Y . B . G</h1>
        <div className='live'>2002.12.26 ~ {lastDeath}</div>
        <div className='death-count'>지금까지 {deathCount}번 죽었습니다.</div>
      </div>
    </>
  );
}
