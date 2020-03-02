import { toMatchObjectCloseTo } from '../index';

expect.extend({ toMatchObjectCloseTo });

describe('toMatchObjectCloseTo', () => {
  [
    [{ foo: 0 }, { foo: 0 }],
    [{ foo: 0 }, { foo: 0.00000000001 }],
    [{ foo: 1.1234567891 }, { foo: 1.12345678909 }],
    [{ foo: 1.1234567891 }, { foo: 1.12345678906 }],
    // [{ foo: 1.1234567891 }, { foo: 1.12345678905 }],
    [{ foo: 1.1234567891 }, { foo: 1.12345678914 }],
    [{ foo: Infinity }, { foo: Infinity }],
    [{ foo: -Infinity }, { foo: -Infinity }],
  ].forEach(([recieved, expected]) => {
      it(`{pass: true} expect(${JSON.stringify(recieved)}).toMatchObjectCloseTo(${JSON.stringify(expected)})`, () => {
        expect(recieved).toMatchObjectCloseTo(expected);
      });
  });

  [
    [{ foo: 0 }, { foo: 0.0000000001 }],
    [{ foo: 1.12345678 }, { foo: 1.1234567891 }],
    [{ foo: 1.1234567891 }, { foo: 1.123456789049999 }],
    [{ foo: Infinity }, { foo: -Infinity }],
    [{ foo: Infinity }, { foo: 1.1234567891 }],
    [{ foo: -Infinity }, { foo: -1.1234567891 }],
    [{ foo: 1, bar: 2 }, { foo: 1 }],
    [{ foo: 1, bar: 2 }, { foo: 1, baz: 2 }],
  ].forEach(([recieved, expected]) => {
      it(`{pass: false} expect(${JSON.stringify(recieved)}).toMatchObjectCloseTo(${JSON.stringify(expected)})`, () => {
        expect(recieved).not.toMatchObjectCloseTo(expected);
      });
  });

  [
    [{ foo: 0 }, { foo: 0.1 }, 0],
    [{ foo: 0 }, { foo: 0.0001 }, 3],
    [{ foo: 0 }, { foo: 0.000004 }, 5],
    [{ foo: 2.0000002 }, { foo: 2 }, 5],
  ].forEach(([recieved, expected, precision]) => {
      it(`{pass: true} expect(${JSON.stringify(recieved)}).toMatchObjectCloseTo(${JSON.stringify(expected)}, ${precision})`, () => {
        expect(recieved).toMatchObjectCloseTo(expected, precision);
      });
  });
});
