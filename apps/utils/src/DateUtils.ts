const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

const DATE_FORMAT = 'yyyy-MM-dd';

const TIME_FORMAT = 'HH:mm';

const DISPLAY_DATE_FORMAT = 'yyyy/MM/dd';

const DISPLAY_DATE_TIME_FORMAT = 'yyyy/MM/dd HH:mm';

const ERROR_DISPLAY_STR = '#N/A';

const DAY_OF_WEEK = ['日', '月', '火', '水', '木', '金', '土'] as const;
export type DayOfWeek = typeof DAY_OF_WEEK[number];

const parseStringToDate = (dateStr: string) => {
  const parseDateMillis = Date.parse(dateStr);
  if (!parseDateMillis) {
    return null;
  }

  return new Date(parseDateMillis);
};

const formatDateToString = (target?: Date | string | null, format?: string) => {
  if (!target || !format) {
    return ERROR_DISPLAY_STR;
  }
  const date = typeof target === 'string' ? parseStringToDate(target) : target;
  if (!date) {
    return ERROR_DISPLAY_STR;
  }

  let formatted: string = format.replace(
    /yyyy/g,
    date.getFullYear().toString(),
  );
  formatted = formatted.replace(/MM/g, `0${date.getMonth() + 1}`.slice(-2));
  formatted = formatted.replace(/dd/g, `0${date.getDate()}`.slice(-2));
  formatted = formatted.replace(/HH/g, `0${date.getHours()}`.slice(-2));
  formatted = formatted.replace(/mm/g, `0${date.getMinutes()}`.slice(-2));
  formatted = formatted.replace(/ss/g, `0${date.getSeconds()}`.slice(-2));
  formatted = formatted.replace(
    /SSS/g,
    `00${date.getMilliseconds()}`.slice(-3),
  );

  return formatted;
};

export const getCurrentDateString = () => {
  return formatDateToString(new Date(), DATE_FORMAT);
};

export const getCurrentDateTimeString = () => {
  return formatDateToString(new Date(), DATE_TIME_FORMAT);
};

export const formatDateString = (date: Date | string | null) => {
  return formatDateToString(date, DATE_FORMAT);
};

export const formatDateTimeString = (date: Date | string | null) => {
  return formatDateToString(date, DATE_TIME_FORMAT);
};

export const formatTimeString = (date: Date | string | null) => {
  return formatDateToString(date, TIME_FORMAT);
};

export const formatDisplayDateString = (date?: Date | string | null) => {
  return formatDateToString(date, DISPLAY_DATE_FORMAT);
};

export const formatDisplayDateTimeString = (date?: Date | string | null) => {
  return formatDateToString(date, DISPLAY_DATE_TIME_FORMAT);
};

export const calcWeek = (target?: string | Date | null) => {
  if (!target) {
    return ERROR_DISPLAY_STR;
  }
  const date = typeof target === 'string' ? parseStringToDate(target) : target;
  if (!date) {
    return ERROR_DISPLAY_STR;
  }
  const weekNum = date.getDay();

  return weekNum >= 0 && weekNum < DAY_OF_WEEK.length
    ? DAY_OF_WEEK[weekNum]
    : ERROR_DISPLAY_STR;
};

export const calcDate = (
  target: Date | string,
  calcTime: number,
  calcType: 'day' | 'hour',
) => {
  const date = typeof target === 'string' ? parseStringToDate(target) : target;
  if (!date) {
    return null;
  }
  const newDate = new Date(date);
  if (calcType === 'day') {
    newDate.setDate(date.getDate() + calcTime);
  } else if (calcType === 'hour') {
    newDate.setHours(date.getHours() + calcTime);
  }

  return newDate;
};
