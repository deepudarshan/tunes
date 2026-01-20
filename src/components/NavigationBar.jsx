import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import './NavigationBar.css'

function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Search functionality will be implemented later
    console.log('Searching for:', searchQuery)
  }

  const handleHomeClick = () => {
    // Home navigation will be implemented later
    console.log('Navigating to home')
  }

  return (
    <nav className="navigation-bar">
      <div className="nav-left">
        <img src={reactLogo} alt="Logo" className="nav-logo" />
        <button className="nav-home-btn" onClick={handleHomeClick}>
          Home
        </button>
      </div>
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="nav-search-input"
        />
      </form>
      <div className="nav-right"></div>
    </nav>
  )
}

export default NavigationBar
