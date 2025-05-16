/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObjectEqual = (
  objA: Record<string, any>,
  objB: Record<string, any>,
) => {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (const item of keysA) {
    if (objA[item] !== objB[item]) return false;
  }

  return true;
};
