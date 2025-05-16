export const removeSpecialCharacters = (input: string) =>
  input.replace(/[^a-zA-Z0-9]/g, '');
