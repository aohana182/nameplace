import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import { toast } from 'sonner';

interface UseMapInitializationProps {
  userLocation: { lat: number; lng: number } | null;
  locationStatus: 'requesting' | 'granted' | 'denied' | 'unavailable';
  onAddPin: (location: { lng: number; lat: number }) => void;
}

export const useMapInitialization = ({ userLocation, locationStatus, onAddPin }: UseMapInitializationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || !userLocation || mapInstanceRef.current) return;

    try {
      const map = L.map(mapRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: locationStatus === 'granted' ? 15 : 12,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      map.on('click', (e: L.LeafletMouseEvent) => {
        onAddPin({ lng: e.latlng.lng, lat: e.latlng.lat });
      });

      const handleResize = () => {
        setTimeout(() => { map.invalidateSize(); }, 100);
      };

      window.addEventListener('resize', handleResize);
      setTimeout(() => { map.invalidateSize(); }, 100);

      mapInstanceRef.current = map;
      setIsMapReady(true);

      toast.success(locationStatus === 'granted'
        ? "Map loaded with your location! Click anywhere to add pins."
        : "Map loaded with default location! Click anywhere to add pins.");

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error("Error loading map. Please refresh the page.");
    }
  }, [userLocation, locationStatus, onAddPin]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return { mapRef, mapInstanceRef: mapInstanceRef.current, isMapReady };
};
