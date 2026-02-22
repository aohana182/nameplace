import { useRef, useEffect, useState, useCallback } from 'react';
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
  const onAddPinRef = useRef(onAddPin);
  onAddPinRef.current = onAddPin;
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || !userLocation || mapInstanceRef.current) return;

    try {
      const map = L.map(mapRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: locationStatus === 'granted' ? 16 : 12,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      map.on('click', (e: L.LeafletMouseEvent) => {
        const target = e.originalEvent?.target as HTMLElement;
        if (target?.closest?.('.custom-pin-marker') || target?.closest?.('.custom-marker-wrapper')) {
          return;
        }
        onAddPinRef.current({ lng: e.latlng.lng, lat: e.latlng.lat });
      });

      const handleResize = () => {
        setTimeout(() => { map.invalidateSize(); }, 100);
      };

      window.addEventListener('resize', handleResize);
      setTimeout(() => { map.invalidateSize(); }, 100);

      mapInstanceRef.current = map;
      setIsMapReady(true);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error("Error loading map. Please refresh the page.");
    }
  }, [userLocation, locationStatus]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return { mapRef, mapInstanceRef, isMapReady };
};
