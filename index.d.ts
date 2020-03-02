declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchObjectCloseTo: (
        expected: object,
        decimals?: number,
      ) => R;
    }
  }
}

export function toMatchObjectCloseTo(
  received: object,
  expected: object,
  decimals?: number,
): {
  message(): string;
  pass: boolean;
}
