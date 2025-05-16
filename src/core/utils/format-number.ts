/*
export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('id-ID').format(number);
};
*/

export const formatNumber = (number?: number | null) => {
  if (number == undefined || number == null) return '';
  return new Intl.NumberFormat('id-ID').format(number);
};
