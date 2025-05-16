/**
 * Remove empty field from an object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEmptyField = (query?: Record<string, any>) => {
  if (!query) return {};
  return Object.entries(query)
    .filter((q) => q[1])
    .reduce(
      (acc, [key, val]) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        acc[key] = val;
        return acc;
      },
      {} as Record<string, string>,
    );
};
