import { useEffect, useState } from 'react'
import AudioPlayer from './components/AudioPlayer'
import "./index.scss";
import "./iconfont/iconfont.scss";
import { validTxid } from './utils';



function App() {
  // TODO: add metadata parsing on file download
  const [audiotx, setAudiotx] = useState('')

  async function updateTxid() {

    let txid = window.location.pathname.split('/')[2] // assumes is not arns name
    try {
      // check site header for x-arns-resolved-txid

      const targetId = await fetch(window.location.href).then(res => res.headers.get('x-arns-resolved-id'))
      if (targetId || window.location.host.startsWith('localhost')) {
        txid = window.location.pathname.split('/')[1]
      }
    } catch (error) {
      console.error('Error fetching txid from header', error)
    }

    if (validTxid(txid)) {
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
