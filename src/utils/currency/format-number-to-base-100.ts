export function formatNumberToBase100(number?: string | number) {
  if (!number) return 0;

  let formattedNumber = 0;

  if (typeof number === 'string') {
    let cleanNumber = number;

    if (number.includes(',')) {
      cleanNumber = number.replace('.', '').replace(',', '.');
    }

    formattedNumber = parseFloat(cleanNumber) * 100;
  } else {
    formattedNumber = number * 100;
  }

  formattedNumber = Math.round(formattedNumber);

  return formattedNumber;
}
