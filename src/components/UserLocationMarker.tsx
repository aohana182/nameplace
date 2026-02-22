import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface UserLocationMarkerProps {
  map: L.Map | null;
  userLocation: { lat: number; lng: number } | null;
  locationStatus: 'requesting' | 'granted' | 'denied' | 'unavailable';
}

export const UserLocationMarker = ({ map, userLocation, locationStatus }: UserLocationMarkerProps) => {
  const userMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!map || !userLocation || locationStatus !== 'granted') return;

    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }

    const userIcon = L.divIcon({
      html: `
        <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #3B82F6; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); position: relative;">
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
        </div>
      `,
      className: 'user-location-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map);
    userMarkerRef.current.bindPopup('📍 Your Current Location');

    return () => {
      if (userMarkerRef.current) userMarkerRef.current = null;
    };
  }, [map, userLocation, locationStatus]);

  return null;
};
