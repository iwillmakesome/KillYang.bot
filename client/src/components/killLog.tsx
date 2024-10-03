import '@/styles/killLog.css';

export default function KillLog({
  log,
}: {
  log: {
    killer: string;
    avatar: string;
    date: string;
    reason: string;
  };
}) {
  return (
    <>
      <div className='killLog'>
        <div className='killInfo'>
          <div className='killer'>
            <img src={log.avatar} />
            <div>{log.killer}</div>
          </div>
          <div>{log.date}</div>
        </div>
        <div className='hr' />
        <div>사유 : {log.reason}</div>
      </div>
    </>
  );
}
