# jest-match-object-close-to

Extend jest to match object with approximate values.

## Installation

`$ npm install --save-dev jest-match-object-close-to`

`$ yarn add --dev jest-match-object-close-to`

## Usage

```js
import { toMatchObjectCloseTo } from 'jest-match-object-close-to';
expect.extend({ toMatchObjectCloseTo });

describe('test object match', () => {
  it('should match', () => {
    expect([12.00001]).toMatchObjectCloseTo([12.000009], 5);
  });
});
```

## License

  [MIT](./LICENSE)
