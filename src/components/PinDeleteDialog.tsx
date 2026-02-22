import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface PinDeleteDialogProps { isOpen: boolean; onOpenChange: (open: boolean) => void; pinName: string; onConfirmDelete: () => void; }

export const PinDeleteDialog = ({ isOpen, onOpenChange, pinName, onConfirmDelete }: PinDeleteDialogProps) => (
  <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
    <AlertDialogContent className="z-[10000]">
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Pin</AlertDialogTitle>
        <AlertDialogDescription>Are you sure you want to delete "{pinName}"? This action cannot be undone.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => onOpenChange(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirmDelete} className="bg-red-600 hover:bg-red-700">Delete Pin</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
