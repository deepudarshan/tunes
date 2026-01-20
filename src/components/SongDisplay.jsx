import './SongDisplay.css'
import AudioPlayer from './AudioPlayer'

function SongDisplay({ song }) {
  return (
    <div className="song-display-card">
      <div className="song-display-content">
        {song ? (
          <>
            <h2 className="song-display-title">Now Playing</h2>
            <div className="song-name-container">
              <p className="song-name">{song.name}</p>
            </div>
            <div className="song-player-container">
              <AudioPlayer src={song.src} />
            </div>
          </>
        ) : (
          <div className="no-song-selected">
            <p className="no-song-text">No song selected</p>
            <p className="no-song-hint">Select a song from the list to play</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SongDisplay
