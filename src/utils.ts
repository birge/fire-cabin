import { family, jane, lucile, isabel } from "./constants";

export const getFamilyOrder = (year: number): family[] => {
  if (year % 3 === 0) {
    return [jane, lucile, isabel];
  }

  if (year % 3 === 1) {
    return [isabel, jane, lucile];
  }

  return [lucile, isabel, jane];
};
