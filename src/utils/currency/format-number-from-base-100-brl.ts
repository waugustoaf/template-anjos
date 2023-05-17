import { utils } from "..";

export function formatNumberFromBase100ToBRL(number: string | number) {
  const numberFromBase100 = utils.currency.formatNumberFromBase100(number);

  return utils.currency.formatNumberToBRL(numberFromBase100);
}
