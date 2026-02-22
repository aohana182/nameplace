import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PinDescriptionFieldProps {
  description: string;
  setDescription: (description: string) => void;
}

export const PinDescriptionField = ({ description, setDescription }: PinDescriptionFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="edit-description">Description</Label>
      <Textarea
        id="edit-description"
        value={description}
        onChange={(e) => setDescription(e.target.value.slice(0, 500))}
        className="min-h-[100px] bg-white border border-gray-200 text-base md:text-sm"
        placeholder="Enter pin description"
        maxLength={500}
        style={{ fontSize: '16px' }}
      />
    </div>
  );
};
