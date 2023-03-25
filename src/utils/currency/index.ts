export function formatCurrencyToBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatNumberToBase100(number: string | number) {
  let formattedNumber = 0;

  if (typeof number === 'string') {
    const cleanNumber = number.replace('.', '').replace(',', '.');

    formattedNumber = parseFloat(cleanNumber) * 100;
  } else {
    formattedNumber = number * 100;
  }

  formattedNumber = Math.round(formattedNumber);

  return formattedNumber;
}

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
