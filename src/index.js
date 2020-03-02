/**
 *
 * @param {object} received
 * @param {object} expected
 * @param {number} [decimals=10]
 * @return {{message: (function(): string), pass: boolean}}
 */
export function toMatchObjectCloseTo(received, expected, decimals = 10) {
  const matcherName = 'toMatchObjectCloseTo';
  const options = {
    isNot: this.isNot,
    promise: this.promise,
  };
  const EXPECTED_LABEL = 'expected';
  const RECEIVED_LABEL = 'received';
  const {
    matcherHint,
    RECEIVED_COLOR,
    printWithType,
    matcherErrorMessage,
    EXPECTED_COLOR,
    printReceived,
    printExpected,
    printDiffOrStringify,
  } = this.utils;

  if (typeof received !== 'object' || received === null) {
    return {
      message: () => matcherErrorMessage(
        matcherHint(matcherName, undefined, undefined, options),
        `${RECEIVED_COLOR('received')} value must be a non-null object`,
        printWithType('Received', received, printReceived),
      ),
      pass: false,
    };
  }

  if (typeof expected !== 'object' || expected === null) {
    return {
      message: () => matcherErrorMessage(
        matcherHint(matcherName, undefined, undefined, options),
        `${EXPECTED_COLOR('expected')} value must be a non-null object`,
        printWithType('Expected', expected, printExpected),
      ),
      pass: false,
    };
  }

  const invalidReceivedPropValue = Object.entries(received).find(
    ([,receivedPropValue]) => typeof receivedPropValue !== 'number'
  );

  if (invalidReceivedPropValue) {
    return {
      message: () => matcherErrorMessage(
        matcherHint(matcherName, undefined, undefined, options),
        `${RECEIVED_COLOR('Received object property value')} is not a number`,
        `${printWithType('Received object property value', invalidReceivedPropValue[1], printReceived)}
        \nRecieved object property: ${printReceived(invalidReceivedPropValue[1])}`,
      ),
      pass: false,
    };
  }

  const invalidExpectedPropValue = Object.entries(expected).find(
    ([, expectedPropValue]) => typeof expectedPropValue !== 'number'
  );

  if (invalidExpectedPropValue) {
    return {
      message: () => matcherErrorMessage(
        matcherHint(matcherName, undefined, undefined, options),
        `${EXPECTED_COLOR('Expected object property value')} is not a number`,
        `${printWithType('Expected object property value', invalidExpectedPropValue[1], printExpected)}`
          + `\nExpected object property: ${printExpected(invalidExpectedPropValue[0])}`,
      ),
      pass: false,
    };
  }

  const pass = checkAssetrion(received, expected, decimals);

  if (pass) {
    return {
      message: () => ''.concat(
        matcherHint(matcherName, undefined, undefined, options),
        '\n\n',
        `The two objects are equal with an approximation to ${decimals} decimal places:\n`,
        `  ${printExpected(expected)}\n`,
        'Received:\n',
        `  ${printReceived(received)}\n`,
      ),
      pass: true,
    }
  }

  return {
    message: () => ''.concat(
      matcherHint(matcherName, undefined, undefined, options),
      '\n\n',
      printDiffOrStringify(
        expected,
        received,
        EXPECTED_LABEL,
        RECEIVED_LABEL,
      ),
    ),
    pass: false,
  };
}

/**
 * @param {object} actual
 * @param {object} expected
 * @param {number} decimals
 * @return {boolean}
 */
function checkAssetrion(received, expected, decimals) {
  const receivedKeys = Object.keys(received).sort();
  const expectedKeys = Object.keys(expected).sort();
  const sameLength = receivedKeys.length === expectedKeys.length;

  if (!sameLength || expectedKeys.some(key => !(key in received))) {
    return false;
  }

  for (let [prop, receivedPropValue] of Object.entries(received)) {
    const expectedPropValue = expected[prop];

    if (receivedPropValue === Infinity && expectedPropValue === Infinity) {
      return true; // Infinity - Infinity is NaN
    }
    
    if (receivedPropValue === -Infinity && expectedPropValue === -Infinity) {
      return true; // -Infinity - -Infinity is NaN
    }

    const expectedDiff = Math.pow(10, -decimals) / 2;
    const receivedDiff = Math.abs(receivedPropValue - expectedPropValue);

    if (receivedDiff > expectedDiff) {
      return false;
    }
  }

  return true;
}
