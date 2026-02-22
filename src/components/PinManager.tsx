import { useState, useEffect } from "react";
import { Pin } from "@/types/Pin";
import { pinService } from "@/services/pinService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface PinManagerProps {
  onPinsChange: (pins: Pin[]) => void;
  onPinSelect: (pin: Pin) => void;
}

export const PinManager = ({ onPinsChange, onPinSelect }: PinManagerProps) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadPinsFromDatabase = async () => {
      if (!user) {
        setPins([]);
        onPinsChange([]);
        return;
      }

      try {
        const savedPins = await pinService.getPins();
        setPins(savedPins);
        onPinsChange(savedPins);
      } catch (error) {
        toast.error('Failed to load pins');
        setPins([]);
        onPinsChange([]);
      }
    };

    loadPinsFromDatabase();
  }, [onPinsChange, user]);

  const handleSavePin = async (pinData: Omit<Pin, 'id' | 'lng' | 'lat' | 'createdAt'>, location: { lng: number; lat: number }) => {
    if (!user) { toast.error('Please sign in to save pins'); return; }

    try {
      const newPin = await pinService.createPin(pinData, location);
      const updatedPins = [...pins, newPin];
      setPins(updatedPins);
      onPinsChange(updatedPins);
      toast.success(`Pin "${pinData.name}" created successfully!`);
    } catch (error) {
      toast.error('Failed to create pin');
    }
  };

  const handleEditPin = async (updatedPin: Pin) => {
    if (!user) { toast.error('Please sign in to edit pins'); return; }

    try {
      const result = await pinService.updatePin(updatedPin);
      const updatedPins = pins.map(pin => pin.id === updatedPin.id ? result : pin);
      setPins(updatedPins);
      onPinsChange(updatedPins);
      toast.success(`Pin "${updatedPin.name}" updated successfully!`);
    } catch (error) {
      toast.error('Failed to update pin');
    }
  };

  const handleDeletePin = async (pinId: string) => {
    if (!user) { toast.error('Please sign in to delete pins'); return; }

    try {
      const pinToDelete = pins.find(p => p.id === pinId);
      await pinService.deletePin(pinId);
      const updatedPins = pins.filter(pin => pin.id !== pinId);
      setPins(updatedPins);
      onPinsChange(updatedPins);
      toast.success(`Pin "${pinToDelete?.name}" deleted successfully!`);
    } catch (error) {
      toast.error('Failed to delete pin');
    }
  };

  return { pins, handleSavePin, handleEditPin, handleDeletePin, handlePinClick: onPinSelect };
};
