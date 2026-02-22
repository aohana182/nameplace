import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Pin, Tag } from "@/types/Pin";
import { usePinForm } from "@/hooks/usePinForm";
import { PinEditForm } from "./PinEditForm";
import { PinViewMode } from "./PinViewMode";
import { PinDeleteDialog } from "./PinDeleteDialog";
import { tagService } from "@/services/pinService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface PinDetailsSheetProps { pin: Pin | null; isOpen: boolean; onClose: () => void; onEdit: (pin: Pin) => void; onDelete: (pinId: string) => void; }

export const PinDetailsSheet = ({ pin, isOpen, onClose, onEdit, onDelete }: PinDetailsSheetProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentPin, setCurrentPin] = useState<Pin | null>(pin);
  const { user } = useAuth();
  const { name, setName, description, setDescription, tags, setTags, setFormValues, isValid, getFormData } = usePinForm(currentPin || undefined);

  useEffect(() => { setCurrentPin(pin); }, [pin]);

  useEffect(() => {
    const loadAvailableTags = async () => {
      if (!user) return;
      try { const savedTags = await tagService.getTags(); setAvailableTags(savedTags); }
      catch { toast.error('Failed to load tags'); setAvailableTags([]); }
    };
    loadAvailableTags();
  }, [user]);

  useEffect(() => {
    if (currentPin && isOpen && !isInitialized) { setFormValues(currentPin); setIsInitialized(true); setIsEditing(false); }
    else if (!isOpen) { setIsInitialized(false); setIsEditing(false); }
  }, [currentPin, isOpen, setFormValues, isInitialized]);

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!currentPin) return;
    if (!isInitialized) { setFormValues(currentPin); setIsInitialized(true); }
    setIsEditing(true);
  }, [currentPin, isInitialized, setFormValues]);

  const saveEdit = useCallback(() => {
    if (!currentPin || !isValid) return;
    const formData = getFormData();
    const updatedPin: Pin = { ...currentPin, ...formData };
    setCurrentPin(updatedPin);
    onEdit(updatedPin);
    setIsEditing(false);
  }, [currentPin, isValid, getFormData, onEdit]);

  const cancelEdit = useCallback(() => {
    if (!currentPin) return;
    setFormValues(currentPin);
    setIsEditing(false);
  }, [currentPin, setFormValues]);

  const handleDelete = useCallback(() => {
    if (!currentPin) return;
    onDelete(currentPin.id);
    setShowDeleteAlert(false);
  }, [currentPin, onDelete]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open && !isEditing) onClose();
  }, [isEditing, onClose]);

  if (!currentPin) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange} modal={true}>
        <DialogContent 
          className="w-[95vw] max-w-md mx-auto z-[9999] max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={(e) => {
            if (isEditing) { e.preventDefault(); } else { onClose(); }
          }}
          onEscapeKeyDown={(e) => {
            if (isEditing) e.preventDefault();
          }}
        >
          <DialogHeader className="pb-2">
            <DialogTitle className="flex items-center justify-between">
              <span className="font-serif text-xl">{isEditing ? "Edit Pin" : currentPin.name}</span>
              {!isEditing && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleEditClick} className="h-10 px-3 touch-manipulation rounded-lg" type="button"><Edit className="h-4 w-4 mr-1" /><span className="hidden sm:inline">Edit</span></Button>
                  <Button size="sm" variant="outline" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowDeleteAlert(true); }} className="hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive h-10 px-3 touch-manipulation rounded-lg" type="button"><Trash2 className="h-4 w-4 mr-1" /><span className="hidden sm:inline">Delete</span></Button>
                </div>
              )}
            </DialogTitle>
            <DialogDescription>{isEditing ? "Edit pin details" : "View and manage this pin"}</DialogDescription>
          </DialogHeader>
          <div>
            {isEditing ? (
              <PinEditForm name={name} setName={setName} description={description} setDescription={setDescription} tags={tags} setTags={setTags} availableTags={availableTags} onAvailableTagsChange={setAvailableTags} isValid={isValid} onSave={saveEdit} onCancel={cancelEdit} />
            ) : (
              <PinViewMode pin={currentPin} />
            )}
          </div>
        </DialogContent>
      </Dialog>
      <PinDeleteDialog isOpen={showDeleteAlert} onOpenChange={setShowDeleteAlert} pinName={currentPin.name} onConfirmDelete={handleDelete} />
    </>
  );
};
