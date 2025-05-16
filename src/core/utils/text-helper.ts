export const toTitleCase = (text?: string) => {
  return text
    ?.split(' ')
    .filter((word) => word !== '')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ') ?? '';
};
