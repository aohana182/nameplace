import { useState } from "react";
import { toast } from "sonner";

interface LocationHandlerProps {
  onLocationSelect: (location: { lng: number; lat: number }) => void;
}

export const LocationHandler = ({ onLocationSelect }: LocationHandlerProps) => {
  const [pendingLocation, setPendingLocation] = useState<{ lng: number; lat: number } | null>(null);

  const handleAddPin = (location: { lng: number; lat: number }) => {
    setPendingLocation(location);
    onLocationSelect(location);
  };

  const clearPendingLocation = () => {
    setPendingLocation(null);
  };

  const handleFloatingButtonClick = () => {
    if (!navigator.geolocation) {
      handleAddPin({ lng: -122.4194, lat: 37.7749 });
      return;
    }

    toast.info("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        handleAddPin({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      () => {
        toast.error("Unable to get location, using default");
        handleAddPin({ lng: -122.4194, lat: 37.7749 });
      }
    );
  };

  return { pendingLocation, handleAddPin, clearPendingLocation, handleFloatingButtonClick };
};
