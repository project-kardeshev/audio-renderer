import { useEffect, useState } from 'react'
import AudioPlayer from './components/AudioPlayer'
import "./index.scss";
import "./iconfont/iconfont.scss";

const validTxid = (txid: string) => {
  return /^[a-zA-Z0-9-_]{43}$/.test(txid)
}

function App() {

  // TODO: add metadata parsing on file download
  const [audiotx, setAudiotx] = useState('RRURuZnxZJIAVGMmugRqJgkYNJW88S5X5acCdXvaVIc')

  const txid = window.location.pathname.split('/')[1]

  const config = {
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  }

  useEffect(() => {
    if (validTxid(txid)) {
      setAudiotx(txid)
    } else {
      console.log('Invalid txid')
    }
  }, [txid])




  return (
    <>
      <AudioPlayer audioSrc={`${config.protocol}://${config.host}/${audiotx}`} />
    </>
  )
}

export default App
