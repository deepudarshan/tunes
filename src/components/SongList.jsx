import './SongList.css'

function SongList({ songs, selectedSong, onSelectSong }) {
  return (
    <div className="song-list-card">
      <h2 className="song-list-title">Available Songs</h2>
      <div className="song-list-container">
        {songs.length === 0 ? (
          <p className="no-songs">No songs available</p>
        ) : (
          <ul className="song-list">
            {songs.map((song, index) => (
              <li
                key={index}
                className={`song-item ${selectedSong === song ? 'active' : ''}`}
                onClick={() => onSelectSong(song)}
              >
                <span className="song-item-name">{song.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SongList
