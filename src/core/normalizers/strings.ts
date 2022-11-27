const handleRemoveAccentuation = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]{1,}/g, '');
};

export const normalizeStrings = (text: string = '') => {
  const str = handleRemoveAccentuation(text);
  return str.toLowerCase().trim();
};
