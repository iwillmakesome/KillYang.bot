import '@/styles/mainPage.css';

import ProfileInfo from '@/components/profileInfo';
import KillLog from '@/components/killLog';
import { useState, useEffect } from 'react';

export default function MainPage() {
  const [killLogList, setKillLogList] = useState<any>([]);

  const loadData = async () => {
    const response: any = await fetch('http://localhost:3000/api', {
      method: 'GET',
    });
    const data = await response.json();
    console.log(data);

    setKillLogList(data);
  };

  useEffect(() => {
    loadData();
    console.log(11);
  }, []);

  return (
    <>
      <main>
        <div className='profile'>
          <ProfileInfo />
          <img
            className='profileImg'
            src='/yang1bw.png'
            alt='profile'
            width={150}
            height={160}
          />
          <div className='deathlist'>
            <h2>Kill Log</h2>
            {killLogList.map((log: never, i: number) => (
              <KillLog key={i} log={log} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
