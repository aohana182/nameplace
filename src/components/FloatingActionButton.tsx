import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-6 right-6 h-16 w-16 md:h-14 md:w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 hover:scale-105 active:scale-95 z-50 touch-manipulation"
      aria-label="Add pin at current location"
      style={{ minHeight: '48px', minWidth: '48px' }}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};
