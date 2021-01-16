# jest-match-object-close-to

Extend Jest to be able to compare objects/arrays having numeric values to a specified number of decimal places. By default, the values are compared to 10 decimal places. Nested objects/arrays are not supported.

## Installation

`$ npm install --save-dev jest-match-object-close-to`

`$ yarn add --dev jest-match-object-close-to`

## Usage

```js
import { toMatchObjectCloseTo } from 'jest-match-object-close-to';

expect.extend({ toMatchObjectCloseTo });

describe('sample tests', () => {
  it('should match object with default 10 decimal places precision', () => {
    expect({ foo: 0 }).toMatchObjectCloseTo({ foo: 0.00000000001 });
  });

  it('should match object with defined precision', () => {
    expect([{ foo: 2.0000002 }).toMatchObjectCloseTo({ foo: 2 }, 5);
  });

  it('should match array with defined precision', () => {
    expect([12.00001, 10.001]).toMatchObjectCloseTo([12.000009, 10.001002], 5);
  });
});
```

## License

  [MIT](./LICENSE)
