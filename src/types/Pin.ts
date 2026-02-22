export interface Pin {
  id: string;
  lng: number;
  lat: number;
  name: string;
  description: string;
  tags?: Tag[];
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  isSystem?: boolean;
}

export const DEFAULT_SYSTEM_TAGS: Tag[] = [
  { id: 'work', name: 'Work', color: '#3B82F6', isSystem: true },
  { id: 'social', name: 'Social', color: '#10B981', isSystem: true },
  { id: 'family', name: 'Family', color: '#F59E0B', isSystem: true },
  { id: 'networking', name: 'Networking', color: '#8B5CF6', isSystem: true },
  { id: 'other', name: 'Other', color: '#6B7280', isSystem: true },
];

export const DEFAULT_TAG_COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
  '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
  '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E',
];
