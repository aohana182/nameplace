import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Pin } from "@/types/Pin";
import { Shield } from "lucide-react";

interface PinViewModeProps { pin: Pin; }

export const PinViewMode = ({ pin }: PinViewModeProps) => {
  const createdDate = new Date(pin.createdAt).toLocaleDateString();
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Added {createdDate}</span>
      </div>
      {pin.tags && pin.tags.length > 0 && (
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-1">
            {pin.tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-1">
                <Badge variant="secondary" style={{ backgroundColor: tag.color + '20', color: tag.color, border: `1px solid ${tag.color}40` }}>{tag.name}</Badge>
                {tag.isSystem && <Shield className="h-3 w-3 text-blue-500" />}
              </div>
            ))}
          </div>
        </div>
      )}
      {pin.description && (
        <div className="space-y-2">
          <Label>Description</Label>
          <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{pin.description}</p>
        </div>
      )}
      <div className="space-y-2">
        <Label>Location</Label>
        <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-md">{pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}</p>
      </div>
    </div>
  );
};
