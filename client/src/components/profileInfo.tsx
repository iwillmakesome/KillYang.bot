import '@/styles/profileInfo.css';

import { useEffect, useState } from 'react';

export default function ProfileInfo() {
  const [deathCount, setDeathCount] = useState<number>(0);
  const [lastDeath, setLastDeath] = useState<string>('');

  const loadDate = async () => {
    const countRes = await fetch(`${window.location.origin}/api/count`, {
      method: 'GET',
    });
    setDeathCount(await countRes.json());

    const lastRes = await fetch(`${window.location.origin}/api/last`, {
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
        <h1>양 . 범 . 건</h1>
        <div className='live'>2002.12.26 ~ {lastDeath}</div>
        <div className='death-count'>지금까지 {deathCount}번 죽었습니다.</div>
      </div>
    </>
  );
}
