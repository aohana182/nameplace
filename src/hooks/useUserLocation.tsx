import { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';

let globalLocationRequest: Promise<GeolocationPosition> | null = null;
let globalLocationCache: { lat: number; lng: number; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'requesting' | 'granted' | 'denied' | 'unavailable'>('requesting');
  const isRequestingRef = useRef(false);
  const hasRequestedRef = useRef(false);

  const getCurrentPosition = useCallback((options: PositionOptions): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Location request timeout'));
      }, options.timeout || 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => { clearTimeout(timeoutId); resolve(position); },
        (error) => { clearTimeout(timeoutId); reject(error); },
        options
      );
    });
  }, []);

  const handleLocationError = useCallback((error: any) => {
    const fallbackLocation = { lat: 37.7749, lng: -122.4194 };

    if (error instanceof GeolocationPositionError) {
      switch(error.code) {
        case GeolocationPositionError.PERMISSION_DENIED:
          setLocationStatus('denied');
          break;
        case GeolocationPositionError.POSITION_UNAVAILABLE:
          setLocationStatus('unavailable');
          break;
        default:
          setLocationStatus('unavailable');
          break;
      }
    } else {
      setLocationStatus('unavailable');
    }

    toast.error("Location unavailable. Using San Francisco as default.");
    setUserLocation(fallbackLocation);
    globalLocationRequest = null;
  }, []);

  const requestLocation = useCallback(async () => {
    if (isRequestingRef.current || hasRequestedRef.current) return;

    if (globalLocationCache && Date.now() - globalLocationCache.timestamp < CACHE_DURATION) {
      setUserLocation({ lat: globalLocationCache.lat, lng: globalLocationCache.lng });
      setLocationStatus('granted');
      return;
    }

    if (!navigator.geolocation) {
      setLocationStatus('unavailable');
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
      return;
    }

    if (globalLocationRequest) {
      try {
        const position = await globalLocationRequest;
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLocationStatus('granted');
      } catch (error) {
        handleLocationError(error);
      }
      return;
    }

    try {
      isRequestingRef.current = true;
      hasRequestedRef.current = true;
      setLocationStatus('requesting');

      globalLocationRequest = getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      });

      const position = await globalLocationRequest;
      const location = { lat: position.coords.latitude, lng: position.coords.longitude };

      globalLocationCache = { ...location, timestamp: Date.now() };
      setUserLocation(location);
      setLocationStatus('granted');
      toast.success(`Location found! Accuracy: ${Math.round(position.coords.accuracy)}m`);
    } catch (error) {
      handleLocationError(error);
    } finally {
      isRequestingRef.current = false;
      globalLocationRequest = null;
    }
  }, [getCurrentPosition, handleLocationError]);

  useEffect(() => {
    if (!hasRequestedRef.current) requestLocation();
  }, [requestLocation]);

  useEffect(() => {
    return () => { isRequestingRef.current = false; };
  }, []);

  return { userLocation, locationStatus };
};
