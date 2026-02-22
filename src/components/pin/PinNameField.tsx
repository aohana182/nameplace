import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PinNameFieldProps {
  name: string;
  setName: (name: string) => void;
  isValid: boolean;
}

export const PinNameField = ({ name, setName, isValid }: PinNameFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="edit-name">Name *</Label>
      <Input
        id="edit-name"
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, 100))}
        placeholder="Enter pin name"
        maxLength={100}
        className="bg-white border border-gray-200 text-base md:text-sm h-12"
        style={{ fontSize: '16px' }}
      />
      {!isValid && <p className="text-red-500 text-sm">Name is required</p>}
    </div>
  );
};
