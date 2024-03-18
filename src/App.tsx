import { useEffect, useState } from 'react'
import AudioPlayer from './components/AudioPlayer'
import "./index.scss";
import "./iconfont/iconfont.scss";
import { validTxid } from './utils';



function App() {
  // TODO: add metadata parsing on file download
  const [audiotx, setAudiotx] = useState('')

  // see renderer spec https://specs.arweave.dev/?tx=rF3z0U1rsUJyJLhKGzigoPZPuxuHn3HRT80SZdGQBd4
  async function updateTxid() {

    let txid = new URLSearchParams(window.location.search).get('tx')

    if (txid && validTxid(txid)) {
      setAudiotx(txid)
    } else {
      console.log('Invalid txid')
    }

  }
  const config = {
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  }

  useEffect(() => {
    window.addEventListener('load', updateTxid)
    return () => {
      window.removeEventListener('load', updateTxid)
    }

  }, [location])

  return (
    <>
      <AudioPlayer audioSrc={`${config.protocol}://${config.host}/${audiotx}`} />
    </>
  )
}

export default App
