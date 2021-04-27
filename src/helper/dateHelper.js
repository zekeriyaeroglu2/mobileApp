import moment from 'moment';

export function getCurDate(format = 'YYYY-MM-DD HH:mm:ss') {
  return moment().utcOffset(3).format(format);
}

export function getCurDateAdd(int, ref, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment().utcOffset(3).add(int, ref).format(format);
}

const dateHelper = {
  getCurDate,
  getCurDateAdd,
};

export default dateHelper;
