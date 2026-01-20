import { useState } from 'react'
import './App.css'
import NavigationBar from './components/NavigationBar'
import SongList from './components/SongList'
import SongDisplay from './components/SongDisplay'
import audioFile from './songs/Fukashigi No Carte _Bunny Girl Senpai_.mp3'

function App() {
  const [selectedSong, setSelectedSong] = useState(null)

  const getSongNameFromPath = (path) => {
    return decodeURIComponent(
      path
      .split('/')
      .pop()                    // get filename
      .replace(/\.[^/.]+$/, '') // remove extension
      .replace(/\s*_(.*?)_\s*/g, ' ($1) ') // _text_ → (text)
      .replace(/\s+/g, ' ')     // remove extra spaces
      .trim()
    )
  }

  const songs = [
    {
      name: getSongNameFromPath(audioFile),
      src: audioFile
    }
  ]

  const handleSelectSong = (song) => {
    setSelectedSong(song)
  }

  return (
    <>
      <NavigationBar />
      <div className="app-container">
        <div className="app-content">
          <SongList 
            songs={songs} 
            selectedSong={selectedSong}
            onSelectSong={handleSelectSong}
          />
          <SongDisplay song={selectedSong} />
        </div>
      </div>
    </>
  )
}

export default App
