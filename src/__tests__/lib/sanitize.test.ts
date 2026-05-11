import { sanitize } from '../../lib/sanitize';

describe('sanitize', () => {
  it('returns empty string for null', () => {
    expect(sanitize(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(sanitize(undefined)).toBe('');
  });

  it('returns empty string for empty string', () => {
    expect(sanitize('')).toBe('');
  });

  it('does not modify a normal string', () => {
    expect(sanitize('Juan Riaño')).toBe('Juan Riaño');
  });

  it('trims surrounding whitespace', () => {
    expect(sanitize('  hello  ')).toBe('hello');
  });

  it('strips leading = (formula injection)', () => {
    expect(sanitize('=SUM(A1:A10)')).toBe('SUM(A1:A10)');
  });

  it('strips = and trims the result', () => {
    expect(sanitize('=  SUM(A1)')).toBe('SUM(A1)');
  });

  it('does not strip = in the middle of a string', () => {
    expect(sanitize('a=b')).toBe('a=b');
  });

  it('handles strings that are only whitespace', () => {
    expect(sanitize('   ')).toBe('');
  });

  it('handles = after trimming (= preceded by spaces)', () => {
    expect(sanitize('  =CMD')).toBe('CMD');
  });
});
