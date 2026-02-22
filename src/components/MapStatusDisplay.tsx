interface MapStatusDisplayProps {
  locationStatus: 'requesting' | 'granted' | 'denied' | 'unavailable';
}

export const MapStatusDisplay = ({ locationStatus }: MapStatusDisplayProps) => {
  const getLocationStatusMessage = () => {
    switch (locationStatus) {
      case 'requesting':
        return '🌍 Getting your location...';
      case 'granted':
        return '📍 Your location found! Click anywhere to add a pin, or click existing pins to view details';
      case 'denied':
        return '🚫 Location access denied. Using default location. Click anywhere to add a pin.';
      case 'unavailable':
        return '🌍 Location unavailable. Using default location. Click anywhere to add a pin.';
      default:
        return 'Loading map...';
    }
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 z-10">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <p className="text-sm text-muted-foreground text-center">
          {getLocationStatusMessage()}
        </p>
        {locationStatus === 'denied' && (
          <p className="text-xs text-muted-foreground text-center mt-1">
            You can enable location access in your browser settings
          </p>
        )}
      </div>
    </div>
  );
};
