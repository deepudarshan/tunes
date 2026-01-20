import { useRef, useState, useEffect } from 'react'

// Basic audio player using HTML5 Audio API and React refs.
// This is a simple foundation: one audio source with play / pause.
function AudioPlayer({ src }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Initialize the Audio element once and attach it to the ref.
  useEffect(() => {
    const audio = new Audio(src)
    audioRef.current = audio

    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener('ended', handleEnded)

    return () => {
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

  return (
    <div className="audio-player">
      <button onClick={handleTogglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

export default AudioPlayer

