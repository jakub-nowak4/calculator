import { parseToPostFix } from "../parseMathExpression";

describe("Parsing math expression to postfix notation", () => {
  test("-2", () => {
    expect(parseToPostFix("!2")).toEqual([-2]);
  });

  test("-2+3", () => {
    expect(parseToPostFix("!2+3")).toEqual([-2, 3, "+"]);
  });

  test("4 + (-5) * 6", () => {
    expect(parseToPostFix("4+(!5)*6")).toEqual([4, -5, 6, "*", "+"]);
  });

  test("2 + 3", () => {
    expect(parseToPostFix("2+3")).toEqual([2, 3, "+"]);
  });

  test("10 + 20 * 30", () => {
    expect(parseToPostFix("10+20*30")).toEqual([10, 20, 30, "*", "+"]);
  });

  test("7 + 8 / 4 - 2", () => {
    expect(parseToPostFix("7+8/4-2")).toEqual([7, 8, 4, "/", "+", 2, "-"]);
  });

  test("(-3) + 4", () => {
    expect(parseToPostFix("(!3)+4")).toEqual([-3, 4, "+"]);
  });

  test("(-3) * (-4)", () => {
    expect(parseToPostFix("(!3)*(!4)")).toEqual([-3, -4, "*"]);
  });

  test("(-3) + (-4) * 2", () => {
    expect(parseToPostFix("(!3)+(!4)*2")).toEqual([-3, -4, 2, "*", "+"]);
  });

  test("(-3) + 4 * (-2)", () => {
    expect(parseToPostFix("(!3)+4*(!2)")).toEqual([-3, 4, -2, "*", "+"]);
  });

  // Tests with floating-point numbers
  test("3.5 + 2.1", () => {
    expect(parseToPostFix("3.5+2.1")).toEqual([3.5, 2.1, "+"]);
  });

  test("4.2 * 1.5", () => {
    expect(parseToPostFix("4.2*1.5")).toEqual([4.2, 1.5, "*"]);
  });

  test("10.5 / 2.5", () => {
    expect(parseToPostFix("10.5/2.5")).toEqual([10.5, 2.5, "/"]);
  });

  test("7.1 + 8.2 / 4.3 - 2.4", () => {
    expect(parseToPostFix("7.1+8.2/4.3-2.4")).toEqual([
      7.1,
      8.2,
      4.3,
      "/",
      "+",
      2.4,
      "-",
    ]);
  });

  test("(-3.5) + 4.2", () => {
    expect(parseToPostFix("(!3.5)+4.2")).toEqual([-3.5, 4.2, "+"]);
  });

  test("(-3.5) * (-4.2)", () => {
    expect(parseToPostFix("(!3.5)*(!4.2)")).toEqual([-3.5, -4.2, "*"]);
  });

  test("(-3.5) + (-4.2) * 2.1", () => {
    expect(parseToPostFix("(!3.5)+(!4.2)*2.1")).toEqual([
      -3.5,
      -4.2,
      2.1,
      "*",
      "+",
    ]);
  });

  test("(-3.5) + 4.2 * (-2.1)", () => {
    expect(parseToPostFix("(!3.5)+4.2*(!2.1)")).toEqual([
      -3.5,
      4.2,
      -2.1,
      "*",
      "+",
    ]);
  });

  // Tests with modulus operator
  test("10 % 3", () => {
    expect(parseToPostFix("10%3")).toEqual([10, 3, "%"]);
  });

  test("20 + 30 % 4", () => {
    expect(parseToPostFix("20+30%4")).toEqual([20, 30, 4, "%", "+"]);
  });

  test("50 % 7 + 2", () => {
    expect(parseToPostFix("50%7+2")).toEqual([50, 7, "%", 2, "+"]);
  });

  test("100 % 3 * 2", () => {
    expect(parseToPostFix("100%3*2")).toEqual([100, 3, "%", 2, "*"]);
  });

  test("(-10) % 3", () => {
    expect(parseToPostFix("(!10)%3")).toEqual([-10, 3, "%"]);
  });

  test("(-10) % (-3)", () => {
    expect(parseToPostFix("(!10)%(!3)")).toEqual([-10, -3, "%"]);
  });

  test("10 % (-3)", () => {
    expect(parseToPostFix("10%(!3)")).toEqual([10, -3, "%"]);
  });

  test("(-10) % 3 + 5", () => {
    expect(parseToPostFix("(!10)%3+5")).toEqual([-10, 3, "%", 5, "+"]);
  });
});
