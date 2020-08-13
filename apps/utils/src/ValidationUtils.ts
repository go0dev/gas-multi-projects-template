export const isUndefined = (o: any): o is undefined => {
  return typeof o === 'undefined';
};

export const isNull = (o: any): o is null => {
  return o === null;
};

export const isNullUndefined = (o: any): o is undefined | null => {
  return typeof o === 'undefined' || o === null;
};

export const isEmpty = (o: string): o is '' => {
  return o === '';
};

export const isNotEmpty = (o: any) => {
  return !isEmpty(o);
};

export const isAllValuesEquals = (array: Array<any>, value: any) => {
  let result = true;
  array.forEach((v) => {
    if (v !== value) {
      result = false;
    }
  });
  return result;
};
