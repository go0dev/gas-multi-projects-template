import { extractHeaderData } from '@/SheetUtils';

describe('extractHeaderData', () => {
  it('配列が空', () => {
    const data = [[]];
    const result = extractHeaderData(data);
    expect(result).toBeNull();
  });
  it('ヘッダーが空', () => {
    const data = [[], ['one', 'two']];
    const result = extractHeaderData(data);
    expect(result).toBeNull();
  });
  it('データが空', () => {
    const data = [['one', 'two']];
    const result = extractHeaderData(data);
    expect(result).toStrictEqual(['one', 'two']);
  });
});
