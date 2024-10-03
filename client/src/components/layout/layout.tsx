import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [API_URL, setAPI_URL] = useState<string>('');

  useEffect(() => {
    setAPI_URL(
      document.querySelector('meta[name="API_URL"]')?.getAttribute('content') ??
        ''
    );
  }, []);

  return (
    <>
      <header></header>
      <div className='backgroundContainer'>
        <div className='backgoundWall'>
          <Outlet />
          <footer>
            <div className='footerContainer'>
              <h3>
                ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
              </h3>
            </div>
          </footer>
        </div>
        <video src={`${API_URL}/guanzaccmim.mp4`} autoPlay muted loop />
      </div>
    </>
  );
}
