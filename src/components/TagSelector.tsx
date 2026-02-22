import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Plus } from "lucide-react";
import { Tag } from "@/types/Pin";
import { TagManager } from "./TagManager";

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  onAvailableTagsChange: (tags: Tag[]) => void;
}

export const TagSelector = ({ availableTags, selectedTags, onTagsChange, onAvailableTagsChange }: TagSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleTag = (tag: Tag) => {
    const isSelected = selectedTags.some(t => t.id === tag.id);
    onTagsChange(isSelected ? selectedTags.filter(t => t.id !== tag.id) : [...selectedTags, tag]);
  };
  const isTagSelected = (tag: Tag) => selectedTags.some(t => t.id === tag.id);

  return (
    <div className="space-y-2">
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge key={tag.id} variant="secondary" style={{ backgroundColor: tag.color + '20', color: tag.color, border: `1px solid ${tag.color}40` }} className="cursor-pointer min-h-[32px] px-3 py-1 touch-manipulation" onClick={() => toggleTag(tag)}>
              {tag.name} ✕
            </Badge>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-10 px-4 touch-manipulation"><Plus className="h-4 w-4 mr-2" />Add Tags</Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 md:w-64 z-[10500]" align="start">
            <div className="space-y-2">
              <div className="font-medium text-sm">Select Tags</div>
              <ScrollArea className="h-40">
                <div className="space-y-1">
                  {availableTags.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No tags available</p>
                  ) : (
                    availableTags.map((tag) => (
                      <div key={tag.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded cursor-pointer touch-manipulation min-h-[44px]" onClick={() => toggleTag(tag)}>
                        <Badge variant="secondary" style={{ backgroundColor: tag.color + '20', color: tag.color, border: `1px solid ${tag.color}40` }}>{tag.name}</Badge>
                        {isTagSelected(tag) && <Check className="h-4 w-4 text-green-600" />}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>
        <TagManager tags={availableTags} onTagsChange={onAvailableTagsChange} trigger={<Button variant="outline" size="sm" className="h-10 px-4 touch-manipulation">Manage Tags</Button>} />
      </div>
    </div>
  );
};
