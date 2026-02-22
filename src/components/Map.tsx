import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Pin } from '@/types/Pin';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useMapInitialization } from '@/hooks/useMapInitialization';
import { UserLocationMarker } from './UserLocationMarker';
import { PinMarkers } from './PinMarkers';
import { MapStatusDisplay } from './MapStatusDisplay';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  pins: Pin[];
  onAddPin: (location: { lng: number; lat: number }) => void;
  onPinClick: (pin: Pin) => void;
}

export const Map = ({ pins, onAddPin, onPinClick }: MapProps) => {
  const { userLocation, locationStatus } = useUserLocation();
  const { mapRef, mapInstanceRef, isMapReady } = useMapInitialization({
    userLocation,
    locationStatus,
    onAddPin
  });
  const hasFittedRef = useRef(false);

  // Auto-fit map to pins when they load
  useEffect(() => {
    if (!mapInstanceRef || !isMapReady || hasFittedRef.current || pins.length === 0) return;
    
    const bounds = L.latLngBounds(pins.map(p => [p.lat, p.lng] as L.LatLngTuple));
    mapInstanceRef.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    hasFittedRef.current = true;
  }, [mapInstanceRef, isMapReady, pins]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{ minHeight: '100%', backgroundColor: '#f3f4f6' }}
      />

      <UserLocationMarker
        map={mapInstanceRef}
        userLocation={userLocation}
        locationStatus={locationStatus}
      />

      <PinMarkers
        map={mapInstanceRef}
        pins={pins}
        onPinClick={onPinClick}
        isMapReady={isMapReady}
      />

      <MapStatusDisplay locationStatus={locationStatus} />

      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
          <div className="text-center px-4">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground text-base">Loading map...</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
              {locationStatus === 'requesting' ? 'Getting your location...' : 'Initializing map...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
