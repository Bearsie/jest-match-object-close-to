/**
 *
 * @param {object|array} received
 * @param {object|array} expected
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
    EXPECTED_COLOR,
    printReceived,
    printExpected,
    printDiffOrStringify,
  } = this.utils;

  if (typeof received !== 'object' || received === null) {
    return {
      message: () => ''.concat(
        matcherHint(matcherName, undefined, undefined, options),
        '\n\n',
        `${RECEIVED_COLOR(RECEIVED_LABEL)} object must be a non-null object`,
        '\n',
        printWithType('-', received, printReceived),
      ),
      pass: false,
    };
  }

  if (typeof expected !== 'object' || expected === null) {
    return {
      message: () => ''.concat(
        matcherHint(matcherName, undefined, undefined, options),
        '\n\n',
        `${EXPECTED_COLOR(EXPECTED_LABEL)} object must be a non-null object`,
        '\n',
        printWithType('-', expected, printExpected),
      ),
      pass: false,
    };
  }

  const invalidReceivedPropValue = Object.entries(Object.assign({}, received)).find(
    ([,receivedPropValue]) => typeof receivedPropValue !== 'number'
  );

  if (invalidReceivedPropValue) {
    return {
      message: () => ''.concat(
        matcherHint(matcherName, undefined, undefined, options),
        '\n\n',
        `${RECEIVED_COLOR(RECEIVED_LABEL)}[${printReceived(invalidReceivedPropValue[0])}]`,
        ' should be a number\n',
        `${printWithType('-', invalidReceivedPropValue[1], printReceived)}`,
      ),
      pass: false,
    };
  }

  const invalidExpectedPropValue = Object.entries(Object.assign({}, expected)).find(
    ([, expectedPropValue]) => typeof expectedPropValue !== 'number'
  );

  if (invalidExpectedPropValue) {
    return {
      message: () => ''.concat(
        matcherHint(matcherName, undefined, undefined, options),
        '\n\n',
        `${EXPECTED_COLOR(EXPECTED_LABEL)}[${printExpected(invalidExpectedPropValue[0])}]`,
        ' should be a number\n',
        `${printWithType('-', invalidExpectedPropValue[1], printExpected)}`,
      ),
      pass: false,
    };
  }

  const {
    pass,
    expected: expectedResult,
    received: receivedResult,
  } = checkAssetrion(received, expected, decimals);

  if (pass) {
    return {
      message: () => ''.concat(
        matcherHint(matcherName, undefined, undefined, options),
        '\n\n',
        `The two objects are equal with an approximation to ${decimals} decimal places:\n`,
        `  ${printExpected(expectedResult)}\n`,
        'Received:\n',
        `  ${printReceived(receivedResult)}\n`,
      ),
      pass: true,
    }
  }

  return {
    message: () => ''.concat(
      matcherHint(matcherName, undefined, undefined, options),
      '\n\n',
      printDiffOrStringify(
        expectedResult,
        receivedResult,
        EXPECTED_LABEL,
        RECEIVED_LABEL,
      ),
    ),
    pass: false,
  };
}

/**
 * @param {object|array} received
 * @param {object|array} expected
 * @param {number} decimals
 * @return {{pass: boolean, received: object|array, expected: object|array}}
 */
function checkAssetrion(received, expected, decimals) {
  const receivedKeys = Object.keys(received).sort();
  const expectedKeys = Object.keys(expected).sort();
  const sameLength = receivedKeys.length === expectedKeys.length;

  if (!sameLength || expectedKeys.some(key => !(key in received))) {
    return  { pass: false, received, expected }
  }

  return Object.entries(received).reduce((assertionResult, [prop, receivedPropValue]) => {
    const expectedPropValue = expected[prop];

    if (receivedPropValue === Infinity && expectedPropValue === Infinity) {
      return assertionResult; // Infinity - Infinity is NaN
    }
    
    if (receivedPropValue === -Infinity && expectedPropValue === -Infinity) {
      return assertionResult; // -Infinity - -Infinity is NaN
    }

    const expectedDiff = Math.pow(10, -decimals) / 2;
    const safeCalcFactor = 10 ** decimals;
    const receivedDiff = Math.abs(
      (receivedPropValue * safeCalcFactor - expectedPropValue * safeCalcFactor) / safeCalcFactor
    );

    if (receivedDiff > expectedDiff) {
      return { ...assertionResult, pass: false };
    }

    assertionResult.expected[prop] = assertionResult.received[prop];

    return assertionResult;
  }, { pass: true, received, expected });
}
