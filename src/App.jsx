import { useState, useMemo } from 'react'
import './App.css'
import NavigationBar from './components/NavigationBar'
import SongList from './components/SongList'
import SongDisplay from './components/SongDisplay'

// Dynamically import all MP3 files from the songs directory
const songModules = import.meta.glob('./songs/*.mp3', { eager: true })

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

  // Dynamically create songs array from imported modules
  const songs = useMemo(() => {
    return Object.entries(songModules).map(([path, module]) => ({
      name: getSongNameFromPath(path),
      src: module.default
    }))
  }, [])

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
