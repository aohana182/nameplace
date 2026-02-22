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
      className="fixed bottom-20 right-5 h-14 w-14 md:bottom-6 md:right-6 md:h-14 md:w-14 rounded-full shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90 active:scale-95 transition-all duration-200 z-50 touch-manipulation"
      aria-label="Add pin at current location"
      style={{ minHeight: '48px', minWidth: '48px' }}
    >
      <Plus className="h-5 w-5" />
    </Button>
  );
};
