import { normalizeStrings } from '../core/normalizers/strings';

describe('Normalize', () => {
  it('should normalize string', () => {
    expect(normalizeStrings('Ãbç#@_+dEf\\%(@?!"')).toEqual('abcdef');
  });
});
