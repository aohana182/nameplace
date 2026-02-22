import { useState } from "react";
import { Map } from "@/components/Map";
import { AddPinModal } from "@/components/AddPinModal";
import { PinDetailsSheet } from "@/components/PinDetailsSheet";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { AppLayout } from "@/components/AppLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PinManager } from "@/components/PinManager";
import { LocationHandler } from "@/components/LocationHandler";
import { Pin } from "@/types/Pin";

const MapPage = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const pinManager = PinManager({
    onPinsChange: (newPins) => { setPins(newPins); setIsLoading(false); },
    onPinSelect: setSelectedPin
  });

  const locationHandler = LocationHandler({
    onLocationSelect: () => setIsAddingPin(true)
  });

  const handleSavePin = (pinData: Omit<Pin, 'id' | 'lng' | 'lat' | 'createdAt'>) => {
    if (!locationHandler.pendingLocation) return;
    pinManager.handleSavePin(pinData, locationHandler.pendingLocation);
    setIsAddingPin(false);
    locationHandler.clearPendingLocation();
  };

  const handleCloseAddModal = () => { setIsAddingPin(false); locationHandler.clearPendingLocation(); };

  if (isLoading) return <LoadingSpinner message="Loading your pins..." />;

  return (
    <AppLayout>
      <Map pins={pins} onAddPin={locationHandler.handleAddPin} onPinClick={pinManager.handlePinClick} />

      {!isLoading && pins.length === 0 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl px-5 py-3 shadow-lg text-center">
            <p className="text-sm text-muted-foreground font-medium">Tap anywhere on the map to drop your first pin</p>
          </div>
        </div>
      )}

      <FloatingActionButton onClick={locationHandler.handleFloatingButtonClick} />
      <AddPinModal isOpen={isAddingPin} onClose={handleCloseAddModal} onSave={handleSavePin} />
      <PinDetailsSheet pin={selectedPin} isOpen={!!selectedPin} onClose={() => setSelectedPin(null)} onEdit={pinManager.handleEditPin} onDelete={pinManager.handleDeletePin} />
    </AppLayout>
  );
};

export default MapPage;
