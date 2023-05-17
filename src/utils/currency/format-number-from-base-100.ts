export function formatNumberFromBase100(number: string | number) {
  let formattedNumber = 0;

  if (typeof number === 'string') {
    const cleanNumber = number.replace('.', '').replace(',', '.');

    formattedNumber = parseFloat(cleanNumber) / 100;
  } else {
    formattedNumber = number / 100;
  }

  return formattedNumber;
}
