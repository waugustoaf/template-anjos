export function formatCurrencyToBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

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

export function formatNumberFromBase100Brl(number: string | number) {
  const formattedNumber = formatNumberFromBase100(number);

  return formatCurrencyToBRL(formattedNumber);
}
