interface MapStatusDisplayProps {
  locationStatus: 'requesting' | 'granted' | 'denied' | 'unavailable';
}

export const MapStatusDisplay = ({ locationStatus }: MapStatusDisplayProps) => {
  if (locationStatus === 'granted') return null;

  const getLocationStatusMessage = () => {
    switch (locationStatus) {
      case 'requesting':
        return '🌍 Getting your location...';
      case 'denied':
        return '📍 Location access denied — using default. Tap anywhere to add a pin.';
      case 'unavailable':
        return '📍 Location unavailable — using default. Tap anywhere to add a pin.';
      default:
        return 'Loading map...';
    }
  };

  return (
    <div className="absolute top-20 left-4 right-4 z-10 pointer-events-none">
      <div className="bg-card/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-border/50 max-w-sm mx-auto">
        <p className="text-sm text-muted-foreground text-center">
          {getLocationStatusMessage()}
        </p>
        {locationStatus === 'denied' && (
          <p className="text-xs text-muted-foreground text-center mt-1">
            Enable location in browser settings for better accuracy
          </p>
        )}
      </div>
    </div>
  );
};
