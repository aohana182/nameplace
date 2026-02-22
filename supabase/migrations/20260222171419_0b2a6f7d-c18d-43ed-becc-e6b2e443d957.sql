
-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  is_system BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pins table
CREATE TABLE public.pins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  lng DOUBLE PRECISION NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create junction table for pin-tag relationships
CREATE TABLE public.pin_tags (
  pin_id UUID REFERENCES public.pins(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (pin_id, tag_id)
);

-- Enable Row Level Security
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pin_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tags
CREATE POLICY "Users can view their own tags and system tags"
ON public.tags FOR SELECT
USING (user_id = auth.uid() OR is_system = true);

CREATE POLICY "Users can create their own tags"
ON public.tags FOR INSERT
WITH CHECK (user_id = auth.uid() AND is_system = false);

CREATE POLICY "Users can update their own tags"
ON public.tags FOR UPDATE
USING (user_id = auth.uid() AND is_system = false);

CREATE POLICY "Users can delete their own tags"
ON public.tags FOR DELETE
USING (user_id = auth.uid() AND is_system = false);

-- RLS Policies for pins
CREATE POLICY "Users can view their own pins"
ON public.pins FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create their own pins"
ON public.pins FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own pins"
ON public.pins FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own pins"
ON public.pins FOR DELETE
USING (user_id = auth.uid());

-- RLS Policies for pin_tags
CREATE POLICY "Users can view pin-tag relationships for their own pins"
ON public.pin_tags FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.pins
    WHERE pins.id = pin_tags.pin_id AND pins.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create pin-tag relationships for their own pins"
ON public.pin_tags FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.pins
    WHERE pins.id = pin_tags.pin_id AND pins.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete pin-tag relationships for their own pins"
ON public.pin_tags FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.pins
    WHERE pins.id = pin_tags.pin_id AND pins.user_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_tags_updated_at
  BEFORE UPDATE ON public.tags
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pins_updated_at
  BEFORE UPDATE ON public.pins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_pins_user_id ON public.pins(user_id);
CREATE INDEX idx_tags_user_id ON public.tags(user_id);
CREATE INDEX idx_tags_is_system ON public.tags(is_system);

-- Insert default system tags
INSERT INTO public.tags (name, color, is_system, user_id) VALUES
('Work', '#3B82F6', true, NULL),
('Social', '#10B981', true, NULL),
('Family', '#F59E0B', true, NULL),
('Networking', '#8B5CF6', true, NULL),
('Other', '#6B7280', true, NULL);
