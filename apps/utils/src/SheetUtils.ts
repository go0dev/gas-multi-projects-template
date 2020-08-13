import { logger } from './logger';

export const extractHeaderData = (array: Array<Array<unknown>>) => {
  const headerArray = array[0];
  if (headerArray.length === 0) {
    return null;
  }
  const header = headerArray.filter(
    (value): value is string => typeof value === 'string',
  );
  if (header.length !== headerArray.length) {
    logger.error(`不正なヘッダーデータが混入しています。:${header}`);
    return null;
  }
  return header;
};

export const arrayToObjectArray = <T>(array: Array<Array<unknown>>) => {
  const headerArray = extractHeaderData(array);
  const dataArray = array.slice(1);
  if (!headerArray || dataArray.length === 0) {
    return [];
  }
  const objectArray = dataArray.map((value) => {
    const obj = Object.create(null);
    for (let i = 0; i < headerArray.length; i++) {
      let objValue = value[i];
      if (objValue instanceof Date) {
        objValue = new Date(objValue);
      }
      obj[headerArray[i]] = objValue;
    }
    return obj as T;
  });
  return objectArray;
};
