import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GymDetails.css';

function GymDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gym, setGym] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    useEffect(() => {
        fetch(`${API_BASE_URL}/gyms/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Gym not found');
                return res.json();
            })
            .then(data => {
                setGym(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="loading-container">Loading academy details...</div>;
    if (error) return <div className="error-container">Error: {error}</div>;
    if (!gym) return <div className="error-container">Gym not found</div>;

    return (
        <div className="gym-details-page">
            <button className="back-button" onClick={() => navigate('/')}>
                &larr; Back to search
            </button>

            <section className="gym-details-hero">
                <div className="hero-badge">{gym.city}</div>
                <h1 className="gym-full-name">{gym.name}</h1>
                <p className="gym-instructor">Head Instructor: <span>{gym.instructor}</span></p>
            </section>

            <div className="details-grid">
                <div className="details-main">
                    <section className="details-section">
                        <h2>About the Academy</h2>
                        <p className="description-text">{gym.description}</p>
                    </section>

                    <section className="details-section">
                        <h2>Training Schedule</h2>
                        <div className="schedule-table">
                            {gym.schedule.map((item, idx) => (
                                <div key={idx} className="schedule-row">
                                    <span className="day-label">{item.day}</span>
                                    <div className="time-chips">
                                        {item.times.map((time, tIdx) => (
                                            <span key={tIdx} className="time-chip">{time}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className="details-sidebar">
                    <section className="details-section">
                        <h2>Tags & Style</h2>
                        <div className="tag-cloud">
                            {gym.tags.map((tag, idx) => (
                                <span key={idx} className="style-tag">{tag}</span>
                            ))}
                        </div>
                    </section>

                    <section className="details-section">
                        <h2>Location</h2>
                        <p>{gym.city}, {gym.postcode}</p>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${gym.coordinates.lat},${gym.coordinates.long}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="google-maps-btn"
                        >
                            Open in Google Maps
                        </a>
                    </section>
                </aside>
            </div>
        </div>
    );
}

export default GymDetails;
