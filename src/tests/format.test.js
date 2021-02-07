import { formatStringToNumber, formatNumberToString } from '../helpers/format';

describe('formatStringToNumber()', () => {
  it('should return number', () => {
    expect(formatStringToNumber('300,55')).toEqual(300.55);
    expect(formatStringToNumber('305')).toEqual(305);
    expect(formatStringToNumber('305,00')).toEqual(305);
    expect(formatStringToNumber('1.305,55')).toEqual(1305.55);
  });
});

describe('formatNumberToString()', () => {
  it('should return number', () => {
    expect(formatNumberToString(300.55)).toEqual('300,55');
    expect(formatNumberToString(305)).toEqual('305,00');
    expect(formatNumberToString(1305.55)).toEqual('1305,55');
  });
});
