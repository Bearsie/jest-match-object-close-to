# jest-match-object-close-to

  [![NPM version][npm-image]][npm-url]
  [![npm download][download-image]][download-url]

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

[npm-url]: https://npmjs.org/package/jest-match-object-close-to
[download-url]: https://npmjs.org/package/jest-match-object-close-to
