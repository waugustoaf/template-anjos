import moment from 'moment';

export function formatDateToBR(date: string | Date) {
  const dateFormatted = new Date(date);

  const momentDate = moment(dateFormatted);

  return momentDate.format('DD/MM/YYYY');
}

export function formatDateToMonthAndYear(date: string | Date) {
  const dateFormatted = new Date(date);

  const momentDate = moment(dateFormatted);

  return momentDate.format('MMMM[ de ]YYYY');
}
