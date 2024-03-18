import { useEffect, useState } from 'react'
import AudioPlayer from './components/AudioPlayer'
import "./index.scss";
import "./iconfont/iconfont.scss";
import Arweave from 'arweave'

function App() {

  // TODO: add metadata parsing on file download
  const [audiotx, setAudiotx] = useState('RRURuZnxZJIAVGMmugRqJgkYNJW88S5X5acCdXvaVIc')

  const txid = window.location.pathname.split('/')[1]

  const config = {
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  }
  const arweave = Arweave.init(config)

  useEffect(() => {
    console.log({ txid, loc: window.location.pathname })
    setAudiotx(txid)
  }, [txid])

  return (
    <>
      <AudioPlayer audioSrc={`${config.protocol}://${config.host}/${audiotx}`} />
    </>
  )
}

export default App
