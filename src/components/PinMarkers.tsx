import { useEffect, useRef } from 'react';
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
            width: 30px; height: 30px; border-radius: 50%;
            background-color: ${color}; border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
            color: white; font-weight: bold; font-size: 12px;
            cursor: pointer; position: relative; z-index: 1000;
          " data-pin-id="${pin.id}">${pin.name.charAt(0).toUpperCase()}</div>
        `,
        className: 'custom-marker-wrapper',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([pin.lat, pin.lng], {
        icon: customIcon,
        riseOnHover: true,
        zIndexOffset: 1000
      }).addTo(map);

      const popupContent = `
        <div style="text-align: center; min-width: 150px;">
          <h3 style="font-weight: 600; margin: 0 0 8px 0; color: #1f2937;">${pin.name}</h3>
          ${pin.description ? `<p style="font-size: 14px; color: #6b7280; margin: 8px 0; line-height: 1.4;">${pin.description}</p>` : ''}
          ${firstTag ? `<div style="display: flex; align-items: center; justify-content: center; margin-top: 8px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${color}; margin-right: 8px;"></div>
            <span style="font-size: 12px; color: #9ca3af;">${firstTag.name}</span>
          </div>` : ''}
          <button class="pin-details-btn" style="
            background-color: ${color}; color: white; border: none;
            padding: 6px 12px; border-radius: 4px; font-size: 12px;
            margin-top: 8px; cursor: pointer;
          ">View Details</button>
        </div>
      `;

      marker.bindPopup(popupContent, { closeButton: true, offset: [0, -15] });

      marker.on('click', (e) => {
        e.originalEvent?.stopPropagation();
        L.DomEvent.stopPropagation(e);
        onPinClick(pin);
      });

      marker.on('popupopen', () => {
        const popupElement = marker.getPopup()?.getElement();
        if (popupElement) {
          const button = popupElement.querySelector('.pin-details-btn');
          if (button) {
            button.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              marker.closePopup();
              onPinClick(pin);
            });
          }
        }
      });

      currentMarkers[pin.id] = marker;
    });

    markersRef.current = currentMarkers;
    lastPinsRef.current = [...pins];
  }, [pins, onPinClick, isMapReady, map]);

  return null;
};
