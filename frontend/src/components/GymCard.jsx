import { Link } from 'react-router-dom';
import './GymCard.css';

function GymCard({ gym }) {
    return (
        <div className="gym-card">
            <h2 className="gym-name">{gym.name}</h2>
            <div className="gym-details">
                <p><strong>City:</strong> {gym.city}</p>
                <p><strong>Zip:</strong> {gym.postcode}</p>
            </div>
            <div className="card-actions">
                <Link to={`/gym/${gym.id}`} className="gym-details-link">
                    View Details
                </Link>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${gym.coordinates.lat},${gym.coordinates.long}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gym-map-link"
                >
                    View on Map
                </a>
            </div>
        </div>
    );
}

export default GymCard;
