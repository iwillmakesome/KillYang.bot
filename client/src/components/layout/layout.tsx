import { Outlet } from 'react-router-dom';

export default function Layout() {
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
        <video
          src={`${window.location.origin}/guanzaccmim.mp4`}
          autoPlay
          muted
          loop
        />
      </div>
    </>
  );
}
