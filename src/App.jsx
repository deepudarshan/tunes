import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AudioPlayer from './components/AudioPlayer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AudioPlayer src="C:\Users\deepu\Music\Songs\spotifydown.com - Die For You (with Ariana Grande) - Remix.mp3" />
    </>
  )
}

export default App
