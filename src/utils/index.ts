import { object } from 'yup';
import { api } from './api';
import { mergePagination } from './api/pagination';
import { array } from './array';
import { cache } from './cache';
import { colors } from './colors';
import { currency } from './currency';
import { date } from './date';
import { form } from './form';
import { formatters } from './formatters';
import { mocks } from './mocks';
import { tables } from './tables';
import { text } from './text';
import { validators } from './validators';

export const utils = {
  api: {
    axios: api,
    mergePagination,
  },
  array,
  cache,
  colors,
  currency,
  date,
  form,
  formatters,
  mocks,
  object,
  tables,
  text,
  validators,
};
