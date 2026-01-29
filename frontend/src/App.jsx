import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'
import GymCard from './components/GymCard'
import GymMap from './components/GymMap'
import GymDetails from './components/GymDetails'

function HomePage() {
  const [gyms, setGyms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Search states
  const [searchTerm, setSearchTerm] = useState('')
  const [locationTerm, setLocationTerm] = useState('')

  // Filter states
  const [selectedTags, setSelectedTags] = useState([])

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const fetchGyms = (name = '', location = '', tags = []) => {
    setLoading(true);
    let url = `${API_BASE_URL}/gyms?`;
    if (name) url += `name=${encodeURIComponent(name)}&`;
    if (location) url += `location=${encodeURIComponent(location)}&`;
    if (tags.length > 0) url += `tags=${encodeURIComponent(tags.join(','))}&`;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setGyms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching gyms:", err);
        setError("Failed to load gyms. Is the backend running?");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGyms();
  }, [])

  const handleSearch = () => {
    fetchGyms(searchTerm, locationTerm, selectedTags);
  };

  const toggleTag = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    fetchGyms(searchTerm, locationTerm, newTags);
  };

  const handleTagClick = (city) => {
    setLocationTerm(city);
    fetchGyms(searchTerm, city, selectedTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="app-container">
      <header className="hero-section">
        <div className="hero-badge">Find Your Academy</div>
        <h1 className="hero-title">
          Find BJJ Gyms
          <span>Near You</span>
        </h1>
        <p className="hero-subtitle">
          Discover the best Brazilian Jiu-Jitsu academies in your area. Compare training styles, schedules, and find the perfect gym to start or continue your martial arts journey.
        </p>

        <div className="search-container">
          <div className="search-group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search gyms, styles, instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="search-group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="City or zip code"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>

        <div className="filter-toggles">
          {['Gi', 'No-Gi', 'Kids', 'Beginner Friendly'].map(tag => (
            <button
              key={tag}
              className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="popular-tags">
          <span>Popular:</span>
          {['Los Angeles', 'New York', 'Eindhoven', 'Miami', 'São Paulo'].map(city => (
            <a key={city} onClick={() => handleTagClick(city)}>{city}</a>
          ))}
        </div>
      </header>

      <main className="content-layout">
        <section className="results-section">
          {loading && <div className="loading">Loading premium academies...</div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && (
            <>
              <div className="results-count">
                Showing {gyms.length} academies
              </div>
              <div className="gym-grid">
                {gyms.map(gym => (
                  <GymCard key={gym.id} gym={gym} />
                ))}
              </div>
              {gyms.length === 0 && (
                <div className="no-results">
                  No academies found matching your search.
                </div>
              )}
            </>
          )}
        </section>

        <section className="map-section">
          <GymMap gyms={gyms} />
        </section>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gym/:id" element={<GymDetails />} />
      </Routes>
    </Router>
  )
}

export default App
