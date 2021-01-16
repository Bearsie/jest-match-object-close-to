declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchObjectCloseTo: (
        expected: { [key: string]: number } | number[],
        decimals?: number,
      ) => R;
    }
  }
}

export function toMatchObjectCloseTo(
  received: { [key: string]: number } | number[],
  expected: { [key: string]: number } | number[],
  decimals?: number,
): {
  message(): string;
  pass: boolean;
}
