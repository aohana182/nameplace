import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pin, Tag } from "@/types/Pin";
import { usePinForm } from "@/hooks/usePinForm";
import { tagService } from "@/services/pinService";
import { TagSelector } from "./TagSelector";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface AddPinModalProps { isOpen: boolean; onClose: () => void; onSave: (pinData: Omit<Pin, 'id' | 'lng' | 'lat' | 'createdAt'>) => void; }

export const AddPinModal = ({ isOpen, onClose, onSave }: AddPinModalProps) => {
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const { user } = useAuth();
  const { name, setName, description, setDescription, tags, setTags, resetForm, isValid, getFormData } = usePinForm();

  useEffect(() => {
    const loadAvailableTags = async () => {
      if (!user) return;
      try { const savedTags = await tagService.getTags(); setAvailableTags(savedTags); }
      catch { toast.error('Failed to load tags'); setAvailableTags([]); }
    };
    loadAvailableTags();
  }, [user]);

  const handleSave = () => {
    setHasAttemptedSubmit(true);
    if (!isValid) { toast.error("Name is required!"); return; }
    onSave(getFormData());
    resetForm();
    setHasAttemptedSubmit(false);
  };
  const handleClose = () => { resetForm(); setHasAttemptedSubmit(false); onClose(); };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }} modal={true}>
      <DialogContent className="w-[95vw] max-w-md mx-auto z-[9999] max-h-[90vh] overflow-y-auto" onPointerDownOutside={(e) => { e.preventDefault(); handleClose(); }} onEscapeKeyDown={(e) => { e.preventDefault(); handleClose(); }}>
        <DialogHeader><DialogTitle>Add New Pin</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" placeholder="Enter pin name" value={name} onChange={(e) => setName(e.target.value.slice(0, 100))} maxLength={100} className="w-full text-base md:text-sm" autoFocus style={{ fontSize: '16px' }} />
            {hasAttemptedSubmit && !isValid && <p className="text-destructive text-sm">Name is required</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Notes about this pin..." value={description} onChange={(e) => setDescription(e.target.value.slice(0, 500))} maxLength={500} className="w-full min-h-[80px] text-base md:text-sm" style={{ fontSize: '16px' }} />
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagSelector availableTags={availableTags} selectedTags={tags} onTagsChange={setTags} onAvailableTagsChange={setAvailableTags} />
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={handleClose} className="flex-1 h-12 touch-manipulation">Cancel</Button>
          <Button onClick={handleSave} className="flex-1 h-12 touch-manipulation">Create Pin</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};