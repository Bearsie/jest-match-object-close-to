import { toMatchObjectCloseTo } from '../index';

expect.extend({ toMatchObjectCloseTo });

describe('toMatchObjectCloseTo', () => {
  describe('pass: true', () => {
    [
      [{ foo: 0 }, { foo: 0 }],
      [{ foo: 0 }, { foo: 0.00000000001 }],
      [{ foo: 1.1234567891 }, { foo: 1.12345678909 }],
      [{ foo: 1.1234567891 }, { foo: 1.12345678906 }],
      [{ foo: 1.1234567891 }, { foo: 1.12345678905 }],
      [{ foo: 1.1234567891 }, { foo: 1.12345678914 }],
      [{ foo: Infinity }, { foo: Infinity }],
      [{ foo: -Infinity }, { foo: -Infinity }],
      [{ foo: 0 }, { foo: 0.1 }, 0],
      [{ foo: 0 }, { foo: 0.0001 }, 3],
      [{ foo: 0 }, { foo: 0.000004 }, 5],
      [{ foo: 2.0000002 }, { foo: 2 }, 5],
      [[1.1234567891], [1.12345678914]],
      [[1.1234567891, 1.1234567891], [1.12345678914, 1.12345678914]],
    ].forEach(([recieved, expected, precision]) => {
        it(`expect(${JSON.stringify(recieved)}).toMatchObjectCloseTo(${JSON.stringify(expected)}${precision ? `,${precision}` : ''})`, () => {
          expect(recieved).toMatchObjectCloseTo(expected, precision);
        });
    });
  });

  describe('pass: false', () => {
    [
      [{ foo: 0 }, { foo: 0.0000000001 }],
      [{ foo: 1.12345678 }, { foo: 1.1234567891 }],
      [{ foo: 1.1234567891 }, { foo: 1.123456789049999 }],
      [{ foo: Infinity }, { foo: -Infinity }],
      [{ foo: Infinity }, { foo: 1.1234567891 }],
      [{ foo: -Infinity }, { foo: -1.1234567891 }],
      [{ foo: 1, bar: 2 }, { foo: 1 }],
      [{ foo: 1, bar: 2 }, { foo: 1, baz: 2 }],
      [1, { foo: 1 }],
      [null, { foo: 1 }],
      [{ foo: 1 }, 1],
      [{ foo: 1 }, null],
      [{ foo: 1.1234567891 }, { foo: '1.12345678909' }],
      [{ foo: '1.1234567891' }, { foo: 1.12345678909 }],
      [{ bar: Infinity, foo: 1 }, { bar: Infinity, foo: 1.002 }, 3],
      [{ bar: -Infinity, foo: 1 }, { bar: -Infinity, foo: 1.002 }, 3],
      [[1.1234567891], [1.12345678914, 1.12345678905]],
      [[1.1234567891, 1.1234567891], [1.1234567892, 1.12345678914]],
    ].forEach(([recieved, expected, precision]) => {
        it(`expect(${JSON.stringify(recieved)}).not.toMatchObjectCloseTo(${JSON.stringify(expected)}${precision ? `,${precision}` : ''})`, () => {
          expect(recieved).not.toMatchObjectCloseTo(expected, precision);
        });
    });
  });
});
