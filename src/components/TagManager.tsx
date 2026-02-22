import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, X, Edit2, Palette, Shield } from "lucide-react";
import { Tag, DEFAULT_TAG_COLORS } from "@/types/Pin";
import { tagService } from "@/services/pinService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface TagManagerProps { tags: Tag[]; onTagsChange: (tags: Tag[]) => void; trigger?: React.ReactNode; }

export const TagManager = ({ tags, onTagsChange, trigger }: TagManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState(DEFAULT_TAG_COLORS[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { user } = useAuth();

  const systemTags = tags.filter(tag => tag.isSystem);
  const userTags = tags.filter(tag => !tag.isSystem);

  const handleAddTag = async () => {
    if (!newTagName.trim() || !user) return;
    try {
      const newTag = await tagService.createTag({ name: newTagName.trim(), color: selectedColor });
      onTagsChange([...tags, newTag]);
      setNewTagName('');
      setSelectedColor(DEFAULT_TAG_COLORS[0]);
      toast.success(`Tag "${newTag.name}" created!`);
    } catch { toast.error('Failed to create tag'); }
  };

  const handleDeleteTag = async (tagId: string) => {
    const tagToDelete = tags.find(tag => tag.id === tagId);
    if (tagToDelete?.isSystem || !user) return;
    try {
      await tagService.deleteTag(tagId);
      onTagsChange(tags.filter(tag => tag.id !== tagId));
      toast.success(`Tag "${tagToDelete.name}" deleted!`);
    } catch { toast.error('Failed to delete tag'); }
  };

  const handleEditTag = (tag: Tag) => {
    if (tag.isSystem) return;
    setEditingTag(tag);
    setNewTagName(tag.name);
    setSelectedColor(tag.color);
  };

  const handleSaveEdit = async () => {
    if (!editingTag || !newTagName.trim() || editingTag.isSystem || !user) return;
    try {
      const updatedTag = await tagService.updateTag({ ...editingTag, name: newTagName.trim(), color: selectedColor });
      onTagsChange(tags.map(tag => tag.id === editingTag.id ? updatedTag : tag));
      setEditingTag(null);
      setNewTagName('');
      setSelectedColor(DEFAULT_TAG_COLORS[0]);
      toast.success(`Tag "${updatedTag.name}" updated!`);
    } catch { toast.error('Failed to update tag'); }
  };

  const handleCancelEdit = () => { setEditingTag(null); setNewTagName(''); setSelectedColor(DEFAULT_TAG_COLORS[0]); };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) { setEditingTag(null); setNewTagName(''); setSelectedColor(DEFAULT_TAG_COLORS[0]); setShowColorPicker(false); } }} modal={true}>
      <DialogTrigger asChild>{trigger || <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Manage Tags</Button>}</DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto z-[11000]" onPointerDownOutside={(e) => e.stopPropagation()} onEscapeKeyDown={(e) => e.stopPropagation()}>
        <DialogHeader><DialogTitle className="font-serif">Manage Tags</DialogTitle></DialogHeader>
        <div className="space-y-4">
          {systemTags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2"><Label>Default Tags</Label><Shield className="h-4 w-4 text-primary" /></div>
              <div className="space-y-2 max-h-32 overflow-y-auto bg-secondary p-2 rounded-lg">
                {systemTags.map((tag) => (
                  <div key={tag.id} className="flex items-center justify-between p-2 border border-border rounded-lg bg-card">
                    <Badge variant="secondary" style={{ backgroundColor: tag.color + '20', color: tag.color, border: `1px solid ${tag.color}40` }}>{tag.name}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><Shield className="h-3 w-3" /><span>Protected</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Custom Tags</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {userTags.length === 0 ? <p className="text-sm text-muted-foreground">No custom tags created yet</p> : userTags.map((tag) => (
                <div key={tag.id} className="flex items-center justify-between p-2 border border-border rounded-lg">
                  <Badge variant="secondary" style={{ backgroundColor: tag.color + '20', color: tag.color, border: `1px solid ${tag.color}40` }}>{tag.name}</Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleEditTag(tag)} className="h-6 w-6 p-0"><Edit2 className="h-3 w-3" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteTag(tag.id)} className="h-6 w-6 p-0 text-destructive hover:text-destructive"><X className="h-3 w-3" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 p-3 border-t border-border">
            <Label>{editingTag ? 'Edit Tag' : 'Add New Tag'}</Label>
            <div className="space-y-2">
              <Input placeholder="Tag name" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { editingTag ? handleSaveEdit() : handleAddTag(); } }} />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Color:</Label>
                  <button type="button" className="w-6 h-6 rounded-md border-2 border-border" style={{ backgroundColor: selectedColor }} onClick={() => setShowColorPicker(!showColorPicker)} />
                  <Button type="button" variant="ghost" size="sm" onClick={() => setShowColorPicker(!showColorPicker)} className="h-6 px-2"><Palette className="h-3 w-3" /></Button>
                </div>
                {showColorPicker && (
                  <div className="flex flex-wrap gap-1 p-2 border border-border rounded-lg">
                    {DEFAULT_TAG_COLORS.map((color) => (
                      <button key={color} type="button" className={`w-6 h-6 rounded-md border-2 transition-all ${selectedColor === color ? 'border-foreground scale-110' : 'border-border'}`} style={{ backgroundColor: color }} onClick={() => { setSelectedColor(color); setShowColorPicker(false); }} />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {editingTag ? (
                  <>
                    <Button onClick={handleSaveEdit} disabled={!newTagName.trim()} size="sm" className="flex-1">Save Changes</Button>
                    <Button onClick={handleCancelEdit} variant="outline" size="sm" className="flex-1">Cancel</Button>
                  </>
                ) : (
                  <Button onClick={handleAddTag} disabled={!newTagName.trim()} size="sm" className="w-full"><Plus className="h-4 w-4 mr-2" />Add Tag</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
