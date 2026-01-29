import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map centering and bounds when gyms change
function ChangeView({ gyms }) {
    const map = useMap();
    useEffect(() => {
        if (gyms.length > 0) {
            const bounds = L.latLngBounds(gyms.map(gym => [gym.coordinates.lat, gym.coordinates.long]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
        }
    }, [gyms, map]);
    return null;
}

function GymMap({ gyms }) {
    // Default center (USA if empty, or first gym)
    const defaultCenter = gyms.length > 0
        ? [gyms[0].coordinates.lat, gyms[0].coordinates.long]
        : [34.0522, -118.2437];

    return (
        <div className="map-wrapper">
            <MapContainer
                center={defaultCenter}
                zoom={10}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', borderRadius: '16px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ChangeView gyms={gyms} />
                {gyms.map(gym => (
                    <Marker
                        key={gym.id}
                        position={[gym.coordinates.lat, gym.coordinates.long]}
                    >
                        <Popup>
                            <div className="map-popup">
                                <h3>{gym.name}</h3>
                                <p>{gym.city}</p>
                                <a href={`/gym/${gym.id}`} className="popup-link">View Details</a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default GymMap;
