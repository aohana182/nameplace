import { supabase } from '@/integrations/supabase/client';
import { Pin, Tag } from '@/types/Pin';

export interface DatabasePin {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  lng: number;
  lat: number;
  created_at: string;
  updated_at: string;
}

const convertDatabasePin = (dbPin: DatabasePin, tags: Tag[] = []): Pin => ({
  id: dbPin.id,
  lng: dbPin.lng,
  lat: dbPin.lat,
  name: dbPin.name,
  description: dbPin.description || '',
  tags,
  createdAt: dbPin.created_at,
});

const convertDatabaseTag = (dbTag: any): Tag => ({
  id: dbTag.id,
  name: dbTag.name,
  color: dbTag.color,
  isSystem: dbTag.is_system,
});

export const pinService = {
  async getPins(): Promise<Pin[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data: pinsData, error: pinsError } = await supabase
      .from('pins')
      .select(`
        *,
        pin_tags (
          tags (*)
        )
      `)
      .eq('user_id', user.user.id);

    if (pinsError) throw pinsError;

    return (pinsData || []).map(pin => {
      const tags = (pin as any).pin_tags?.map((pt: any) => convertDatabaseTag(pt.tags)) || [];
      return convertDatabasePin(pin as DatabasePin, tags);
    });
  },

  async createPin(pinData: Omit<Pin, 'id' | 'createdAt'>, location: { lng: number; lat: number }): Promise<Pin> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data: pinResult, error: pinError } = await supabase
      .from('pins')
      .insert({
        user_id: user.user.id,
        name: pinData.name,
        description: pinData.description || null,
        lng: location.lng,
        lat: location.lat,
      })
      .select()
      .single();

    if (pinError) throw pinError;

    if (pinData.tags && pinData.tags.length > 0 && pinResult) {
      const pinTagInserts = pinData.tags.map(tag => ({
        pin_id: pinResult.id,
        tag_id: tag.id,
      }));

      const { error: pinTagsError } = await supabase
        .from('pin_tags')
        .insert(pinTagInserts);

      if (pinTagsError) throw pinTagsError;
    }

    return convertDatabasePin(pinResult, pinData.tags || []);
  },

  async updatePin(updatedPin: Pin): Promise<Pin> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data: pinResult, error: pinError } = await supabase
      .from('pins')
      .update({
        name: updatedPin.name,
        description: updatedPin.description || null,
        lng: updatedPin.lng,
        lat: updatedPin.lat,
      })
      .eq('id', updatedPin.id)
      .eq('user_id', user.user.id)
      .select()
      .single();

    if (pinError) throw pinError;

    await supabase
      .from('pin_tags')
      .delete()
      .eq('pin_id', updatedPin.id);

    if (updatedPin.tags && updatedPin.tags.length > 0) {
      const pinTagInserts = updatedPin.tags.map(tag => ({
        pin_id: updatedPin.id,
        tag_id: tag.id,
      }));

      const { error: pinTagsError } = await supabase
        .from('pin_tags')
        .insert(pinTagInserts);

      if (pinTagsError) throw pinTagsError;
    }

    return convertDatabasePin(pinResult, updatedPin.tags || []);
  },

  async deletePin(pinId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('pins')
      .delete()
      .eq('id', pinId)
      .eq('user_id', user.user.id);

    if (error) throw error;
  },
};

export const tagService = {
  async getTags(): Promise<Tag[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data: tagsData, error } = await supabase
      .from('tags')
      .select('*')
      .or(`is_system.eq.true,user_id.eq.${user.user.id}`);

    if (error) throw error;

    return (tagsData || []).map(convertDatabaseTag);
  },

  async createTag(tag: Omit<Tag, 'id' | 'isSystem'>): Promise<Tag> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { data: tagResult, error } = await supabase
      .from('tags')
      .insert({
        user_id: user.user.id,
        name: tag.name,
        color: tag.color,
        is_system: false,
      })
      .select()
      .single();

    if (error) throw error;

    return convertDatabaseTag(tagResult);
  },

  async updateTag(updatedTag: Tag): Promise<Tag> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    if (updatedTag.isSystem) {
      throw new Error('Cannot update system tags');
    }

    const { data: tagResult, error } = await supabase
      .from('tags')
      .update({
        name: updatedTag.name,
        color: updatedTag.color,
      })
      .eq('id', updatedTag.id)
      .eq('user_id', user.user.id)
      .select()
      .single();

    if (error) throw error;

    return convertDatabaseTag(tagResult);
  },

  async deleteTag(tagId: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', tagId)
      .eq('user_id', user.user.id)
      .eq('is_system', false);

    if (error) throw error;
  },
};
