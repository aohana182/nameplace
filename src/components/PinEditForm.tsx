import { Label } from "@/components/ui/label";
import { Tag } from "@/types/Pin";
import { TagSelector } from "./TagSelector";
import { PinNameField } from "./pin/PinNameField";
import { PinDescriptionField } from "./pin/PinDescriptionField";
import { PinFormActions } from "./pin/PinFormActions";

interface PinEditFormProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  availableTags: Tag[];
  onAvailableTagsChange: (tags: Tag[]) => void;
  isValid: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export const PinEditForm = ({ name, setName, description, setDescription, tags, setTags, availableTags, onAvailableTagsChange, isValid, onSave, onCancel }: PinEditFormProps) => {
  return (
    <div className="space-y-4 relative z-10 bg-background p-1">
      <PinNameField name={name} setName={setName} isValid={isValid} />
      <PinDescriptionField description={description} setDescription={setDescription} />
      <div className="space-y-2">
        <Label>Tags</Label>
        <TagSelector availableTags={availableTags} selectedTags={tags} onTagsChange={setTags} onAvailableTagsChange={onAvailableTagsChange} />
      </div>
      <PinFormActions onSave={onSave} onCancel={onCancel} isValid={isValid} />
    </div>
  );
};
