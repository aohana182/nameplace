import { Button } from "@/components/ui/button";

interface PinFormActionsProps {
  onSave: () => void;
  onCancel: () => void;
  isValid: boolean;
}

export const PinFormActions = ({ onSave, onCancel, isValid }: PinFormActionsProps) => {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isValid) onSave();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel();
  };

  return (
    <div className="flex gap-3 pt-4 bg-white sticky bottom-0 pb-4">
      <Button variant="outline" onClick={handleCancel} className="flex-1 h-12 touch-manipulation" type="button">
        Cancel
      </Button>
      <Button
        onClick={handleSave}
        disabled={!isValid}
        className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white disabled:bg-gray-300 disabled:text-gray-500 h-12 touch-manipulation"
        type="button"
      >
        Save Changes
      </Button>
    </div>
  );
};
