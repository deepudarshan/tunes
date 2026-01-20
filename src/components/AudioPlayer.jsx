import { useRef, useState, useEffect } from 'react'

// Audio player using HTML5 Audio API and React refs,
// with play / pause and a simple progress / duration display.
function AudioPlayer({ src }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  // Helper to format seconds as mm:ss
  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    const mm = String(mins).padStart(2, '0')
    const ss = String(secs).padStart(2, '0')
    return `${mm}:${ss}`
  }

  // Initialize the Audio element once per src and attach it to the ref.
  useEffect(() => {
    if (!src) return

    const audio = new Audio(src)
    audioRef.current = audio
    setIsPlaying(false)
    setDuration(0)
    setCurrentTime(0)

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    // Auto-play whenever a song is set / changed.
    const playOnLoad = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (err) {
        console.error('Error auto-playing audio:', err)
      }
    }

    playOnLoad()

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
    }
  }, [src])

  const handleTogglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (err) {
      console.error('Error controlling audio playback:', err)
    }
  }

  const progress =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0

  return (
    <div className="audio-player">
      <div className="audio-progress">
        <div className="audio-progress-track">
          <div
            className="audio-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="audio-time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <button onClick={handleTogglePlay}>
        {isPlaying ? '⏸' : '▶'}
      </button>
    </div>
  )
}

export default AudioPlayer

