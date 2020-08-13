import { arrayToObjectArray } from '@/SheetUtils';

describe('arrayToObjectArray', () => {
  it('配列が空', () => {
    const data = [[]];
    const result = arrayToObjectArray(data);
    expect(result).toStrictEqual([]);
  });
  it('ヘッダーが空', () => {
    const data = [[], ['one', 'two']];
    const result = arrayToObjectArray(data);
    expect(result).toStrictEqual([]);
  });
  it('データが空', () => {
    const data = [['one', 'two']];
    const result = arrayToObjectArray(data);
    expect(result).toStrictEqual([]);
  });
  it('データあり', () => {
    type Data = {
      one: string;
      two: string;
    };
    const data = [
      ['one', 'two'],
      ['いち', 'に'],
      ['1', '2'],
    ];
    const result = arrayToObjectArray<Data>(data);
    expect(result).not.toBeNull();
    if (!result) throw new Error('result must not be null.');
    expect(result.length).toBe(2);
    expect(result[0].one).toStrictEqual('いち');
    expect(result[0].two).toStrictEqual('に');
    expect(result[1].one).toStrictEqual('1');
    expect(result[1].two).toStrictEqual('2');
  });
});
