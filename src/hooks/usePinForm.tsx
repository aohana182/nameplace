import { useState } from 'react';
import { Pin, Tag } from '@/types/Pin';

export const usePinForm = (initialPin?: Pin) => {
  const [name, setName] = useState(initialPin?.name || "");
  const [description, setDescription] = useState(initialPin?.description || "");
  const [tags, setTags] = useState<Tag[]>(initialPin?.tags || []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setTags([]);
  };

  const setFormValues = (pin: Pin) => {
    setName(pin.name);
    setDescription(pin.description);
    setTags(pin.tags || []);
  };

  const isValid = name.trim().length > 0;

  const getFormData = () => ({
    name: name.trim(),
    description: description.trim(),
    tags,
  });

  return { name, setName, description, setDescription, tags, setTags, resetForm, setFormValues, isValid, getFormData };
};
