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

export function formatDateToISO(date: string | Date) {
  const dateFormatted = new Date(date);

  const momentDate = moment(dateFormatted);

  return momentDate.toISOString();
}

export function utcDateToLocal(stringDate: string | Date) {
  const date = moment(new Date(stringDate)).local().toDate();

  return date;
}

export function localDateToUTC(stringDate: Date | string) {
  const date = new Date(moment(new Date(stringDate)).valueOf());

  return date;
}