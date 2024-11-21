import { calculatePostfix } from "../src/scripts/parseMathExpression";

describe("Evaluate postfix expression", () => {
  test("2 3 +", () => {
    expect(calculatePostfix([2, 3, "+"])).toBe(5);
  });

  test("4 5 *", () => {
    expect(calculatePostfix([4, 5, "*"])).toBe(20);
  });

  test("10 2 /", () => {
    expect(calculatePostfix([10, 2, "/"])).toBe(5);
  });

  test("10 3 %", () => {
    expect(calculatePostfix([10, 3, "%"])).toBe(1);
  });

  test("7 8 4 / + 2 -", () => {
    expect(calculatePostfix([7, 8, 4, "/", "+", 2, "-"])).toBe(7);
  });

  test("-3 4 +", () => {
    expect(calculatePostfix([-3, 4, "+"])).toBe(1);
  });

  test("-3 -4 *", () => {
    expect(calculatePostfix([-3, -4, "*"])).toBe(12);
  });

  test("-3 -4 2 * +", () => {
    expect(calculatePostfix([-3, -4, 2, "*", "+"])).toBe(-11);
  });

  test("-3 4 -2 * +", () => {
    expect(calculatePostfix([-3, 4, -2, "*", "+"])).toBe(-11);
  });

  test("3.5 2.1 +", () => {
    expect(calculatePostfix([3.5, 2.1, "+"])).toBeCloseTo(5.6, 1);
  });

  test("4.2 1.5 *", () => {
    expect(calculatePostfix([4.2, 1.5, "*"])).toBeCloseTo(6.3, 1);
  });

  test("10.5 2.5 /", () => {
    expect(calculatePostfix([10.5, 2.5, "/"])).toBeCloseTo(4.2, 1);
  });

  test("7.1 8.2 4.3 / + 2.4 -", () => {
    expect(calculatePostfix([7.1, 8.2, 4.3, "/", "+", 2.4, "-"])).toBeCloseTo(
      6.6,
      1
    );
  });

  test("-3.5 4.2 +", () => {
    expect(calculatePostfix([-3.5, 4.2, "+"])).toBeCloseTo(0.7, 1);
  });

  test("-3.5 -4.2 *", () => {
    expect(calculatePostfix([-3.5, -4.2, "*"])).toBeCloseTo(14.7, 1);
  });

  test("-3.5 -4.2 2.1 * +", () => {
    expect(calculatePostfix([-3.5, -4.2, 2.1, "*", "+"])).toBeCloseTo(
      -12.32,
      1
    );
  });

  test("-3.5 4.2 -2.1 * +", () => {
    expect(calculatePostfix([-3.5, 4.2, -2.1, "*", "+"])).toBeCloseTo(
      -12.32,
      1
    );
  });

  test("10 3 %", () => {
    expect(calculatePostfix([10, 3, "%"])).toBe(1);
  });

  test("20 30 4 % +", () => {
    expect(calculatePostfix([20, 30, 4, "%", "+"])).toBe(22);
  });

  test("50 7 % 2 +", () => {
    expect(calculatePostfix([50, 7, "%", 2, "+"])).toBe(3);
  });

  test("100 3 % 2 *", () => {
    expect(calculatePostfix([100, 3, "%", 2, "*"])).toBe(2);
  });

  test("-10 3 %", () => {
    expect(calculatePostfix([-10, 3, "%"])).toBe(-1);
  });

  test("-10 -3 %", () => {
    expect(calculatePostfix([-10, -3, "%"])).toBe(-1);
  });

  test("10 -3 %", () => {
    expect(calculatePostfix([10, -3, "%"])).toBe(1);
  });

  test("-10 3 % 5 +", () => {
    expect(calculatePostfix([-10, 3, "%", 5, "+"])).toBe(4);
  });
});
