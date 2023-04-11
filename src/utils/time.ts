import moment from 'moment';
import isNumber from 'lodash/isNumber';

const FORMAT_PATTERN = 'DD MMM hh:mm A';

interface IFormatDate {
  dateTime: number;
  formatPattern?: string;
}
const formatUnixDateTime = ({ dateTime, formatPattern = FORMAT_PATTERN }: IFormatDate) =>
  moment.unix(dateTime).format(formatPattern);

const formatDateTime = ({ dateTime, formatPattern = FORMAT_PATTERN }: IFormatDate) =>
  moment(dateTime).format(formatPattern);

interface IUnixExpired {
  unixTime: number | string | undefined;
  expiredMin?: number;
}

const isExpiredUnixTime = ({ unixTime, expiredMin = 1 }: IUnixExpired) => {
  if (!unixTime || !isNumber(unixTime)) return false;
  const now = Math.floor(new Date().getTime() / 1000);
  expiredMin = expiredMin * 60;
  return now - Number(unixTime) > expiredMin;
};

interface IExpired {
  time: number | string | undefined;
  expiredMin?: number;
}

const isExpiredTime = ({ time, expiredMin = 1 }: IExpired) => {
  if (!time || !isNumber(time)) return false;
  const now = Math.floor(new Date().getTime());
  expiredMin = expiredMin * 60;
  return now - Number(time) > expiredMin;
};

function getCurrentUnixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export { formatUnixDateTime, formatDateTime, isExpiredUnixTime, isExpiredTime, getCurrentUnixTimestamp };
