import { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import { Pin } from '@/types/Pin';

interface PinMarkersProps {
  map: L.Map | null;
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
  isMapReady: boolean;
}

export const PinMarkers = ({ map, pins, onPinClick, isMapReady }: PinMarkersProps) => {
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const lastPinsRef = useRef<Pin[]>([]);
  const onPinClickRef = useRef(onPinClick);
  onPinClickRef.current = onPinClick;

  useEffect(() => {
    if (!map || !isMapReady) return;

    const pinsChanged = lastPinsRef.current.length !== pins.length ||
      pins.some((pin, index) => {
        const lastPin = lastPinsRef.current[index];
        return !lastPin || lastPin.id !== pin.id || lastPin.name !== pin.name ||
               lastPin.lat !== pin.lat || lastPin.lng !== pin.lng ||
               JSON.stringify(lastPin.tags) !== JSON.stringify(pin.tags);
      });

    if (!pinsChanged) return;

    const currentMarkers = markersRef.current;

    Object.keys(currentMarkers).forEach(pinId => {
      if (!pins.find(pin => pin.id === pinId)) {
        map.removeLayer(currentMarkers[pinId]);
        delete currentMarkers[pinId];
      }
    });

    pins.forEach(pin => {
      const firstTag = pin.tags?.[0];
      const color = firstTag?.color || '#6B7280';

      if (currentMarkers[pin.id]) return;

      const customIcon = L.divIcon({
        html: `
          <div class="custom-pin-marker" style="
            width: 32px; height: 32px; border-radius: 50%;
            background-color: ${color}; border: 3px solid white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.25);
            display: flex; align-items: center; justify-content: center;
            color: white; font-weight: 600; font-size: 13px;
            cursor: pointer; position: relative; z-index: 1000;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
          " data-pin-id="${pin.id}"
          onmousedown="this.style.transform='scale(0.9)'"
          onmouseup="this.style.transform='scale(1.1)'"
          ontouchstart="this.style.transform='scale(0.9)'"
          ontouchend="this.style.transform='scale(1.1)'"
          >${pin.name.charAt(0).toUpperCase()}</div>
        `,
        className: 'custom-marker-wrapper',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([pin.lat, pin.lng], {
        icon: customIcon,
        riseOnHover: true,
        zIndexOffset: 1000
      }).addTo(map);

      // Click opens detail sheet directly — no popup needed

      marker.on('click', (e) => {
        e.originalEvent?.stopPropagation();
        L.DomEvent.stopPropagation(e);
        onPinClickRef.current(pin);
      });

      currentMarkers[pin.id] = marker;
    });

    markersRef.current = currentMarkers;
    lastPinsRef.current = [...pins];
  }, [pins, onPinClick, isMapReady, map]);

  return null;
};
