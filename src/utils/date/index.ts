import moment from 'moment';
import 'moment/locale/pt-br';

function formatDateToBR(date: string | Date) {
  const dateFormatted = new Date(date);

  const momentDate = moment(dateFormatted);

  return momentDate.format('DD/MM/YYYY');
}

function formatDateToBRExtension(date: string | Date) {
  const dateFormatted = new Date(date);

  const momentDate = moment(dateFormatted);
  momentDate.locale('pt-br');

  return momentDate.format('LL');
}

function formatDateToMonthAndYear(date: string | Date) {
  const dateFormatted = new Date(date);

  const momentDate = moment(dateFormatted);

  return momentDate.format('MMMM[ de ]YYYY');
}

function formatDateToISO(date: string | Date) {
  const dateFormatted = new Date(date);

  const momentDate = moment(dateFormatted);

  return momentDate.toISOString();
}

function utcDateToLocal(stringDate: string | Date) {
  const date = moment(new Date(stringDate)).local().toDate();

  return date;
}

function localDateToUTC(stringDate: Date | string) {
  const date = new Date(moment(new Date(stringDate)).valueOf());

  return date;
}

export const date = {
  formatDateToBR,
  formatDateToBRExtension,
  formatDateToMonthAndYear,
  formatDateToISO,
  utcDateToLocal,
  localDateToUTC,
};
