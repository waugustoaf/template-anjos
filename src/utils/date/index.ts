import moment from 'moment';
import 'moment/locale/pt-br'

export function formatDateToBR(date: string | Date) {
  const dateFormatted = new Date(date);

  const momentDate = moment(dateFormatted);

  return momentDate.format('DD/MM/YYYY');
}

export function formatDateToBRExtension(date: string | Date) {
  const dateFormatted = new Date(date);

  const momentDate = moment(dateFormatted);
  momentDate.locale('pt-br');

  return momentDate.format('LL');
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
