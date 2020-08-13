import { arrayToObjectArray } from './SheetUtils';
import { isNullUndefined } from './ValidationUtils';
import { logger } from './logger';

export abstract class AbstractSheet<T extends Record<string, unknown>> {
  protected sheet: GoogleAppsScript.Spreadsheet.Sheet;

  protected sheetData: Array<T>;

  protected primaryKey: Array<keyof T>;

  constructor(
    sheetInfo: GoogleAppsScript.Spreadsheet.Sheet | string,
    primaryKey: Array<keyof T>,
  ) {
    let sheet: GoogleAppsScript.Spreadsheet.Sheet | null = null;
    if (typeof sheetInfo === 'string') {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      sheet = spreadsheet.getSheetByName(sheetInfo);
    } else {
      sheet = sheetInfo;
    }
    if (isNullUndefined(sheet)) {
      throw new Error(`シートが見つかりません。シート情報：${sheetInfo}`);
    }
    this.sheet = sheet;
    const values = sheet.getDataRange().getValues();
    this.sheetData = arrayToObjectArray<T>(values);
    this.primaryKey = primaryKey;
  }

  private isEqualsByPrimaryKey = (
    compareValue: Partial<T>,
    comparedValue: Partial<T>,
  ) => {
    let isEquals = true;
    this.primaryKey.forEach((k) => {
      const comparedPrimaryKeyValue = comparedValue[k];
      if (
        isNullUndefined(comparedPrimaryKeyValue) ||
        compareValue[k] !== comparedPrimaryKeyValue
      ) {
        isEquals = false;
      }
    });
    return isEquals;
  };

  public selectByPrimaryKey = (selectKeyValues: Partial<T>) => {
    const result = this.sheetData.filter((data) =>
      this.isEqualsByPrimaryKey(data, selectKeyValues),
    );
    if (!Array.isArray(result) || result.length === 0) {
      return undefined;
    }
    return result[0];
  };

  public selectByData = (whereData: Partial<T>) => {
    return (
      this.sheetData.find((data) => {
        let hit = true;
        Object.keys(whereData).forEach((key: keyof T) => {
          if (isNullUndefined(whereData[key]) || whereData[key] !== data[key]) {
            hit = false;
          }
        });
        return hit;
      }) || null
    );
  };

  public insertUpdateData = (newData: Partial<T>) => {
    const oldData = this.selectByPrimaryKey(newData);
    if (oldData == null) {
      logger.info('データ新規追加');
      this.sheet.appendRow(Object.values(newData));
    } else {
      logger.info('データ更新');
      const updatedRow = this.sheetData.findIndex((data) =>
        this.isEqualsByPrimaryKey(data, newData),
      );
      const updateData = { ...oldData, ...newData };
      const updatedDataArray = Object.values(updateData).map((value) => value);
      this.sheet
        .getRange(updatedRow + 2, 1, 1, updatedDataArray.length)
        .setValues([updatedDataArray]);
    }
  };

  public deleteData = (deletedData: Partial<T>) => {
    const deletedRow = this.sheetData.findIndex((data) =>
      this.isEqualsByPrimaryKey(data, deletedData),
    );
    if (deletedRow === -1) {
      return;
    }
    this.sheet.deleteRow(deletedRow + 2);
  };
}
