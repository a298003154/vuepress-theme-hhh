import moment from 'moment';

export function date(value, format) {
  if (!value) return ''
  const filters = moment(value, 'YYYY-MM-DD HH:mm:ss').format(format || 'YYYY-MM-DD');
  return filters === 'Invalid date' ? '' : filters
}
