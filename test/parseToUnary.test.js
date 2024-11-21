import { parseToUnary } from "../src/scripts/parseMathExpression";

describe("Change - to ! when unary operator", () => {
  test("-2", () => {
    expect(parseToUnary("-2")).toBe("!2");
  });

  test("-2 + (-2)", () => {
    expect(parseToUnary("-2+(-2)")).toBe("!2+(!2)");
  });

  test("(-3) + 4", () => {
    expect(parseToUnary("(-3)+4")).toBe("(!3)+4");
  });

  test("(-3) * (-4)", () => {
    expect(parseToUnary("(-3)*(-4)")).toBe("(!3)*(!4)");
  });

  test("(-3) + (-4) * 2", () => {
    expect(parseToUnary("(-3)+(-4)*2")).toBe("(!3)+(!4)*2");
  });

  test("(-3) + 4 * (-2)", () => {
    expect(parseToUnary("(-3)+4*(-2)")).toBe("(!3)+4*(!2)");
  });

  test("3 + (-4)", () => {
    expect(parseToUnary("3+(-4)")).toBe("3+(!4)");
  });

  test("3 - (-4)", () => {
    expect(parseToUnary("3-(-4)")).toBe("3-(!4)");
  });

  test("(-3.5) + 4.2", () => {
    expect(parseToUnary("(-3.5)+4.2")).toBe("(!3.5)+4.2");
  });

  test("(-3.5) * (-4.2)", () => {
    expect(parseToUnary("(-3.5)*(-4.2)")).toBe("(!3.5)*(!4.2)");
  });

  test("(-3.5) + (-4.2) * 2.1", () => {
    expect(parseToUnary("(-3.5)+(-4.2)*2.1")).toBe("(!3.5)+(!4.2)*2.1");
  });

  test("(-3.5) + 4.2 * (-2.1)", () => {
    expect(parseToUnary("(-3.5)+4.2*(-2.1)")).toBe("(!3.5)+4.2*(!2.1)");
  });

  test("(-10) % 3", () => {
    expect(parseToUnary("(-10)%3")).toBe("(!10)%3");
  });

  test("(-10) % (-3)", () => {
    expect(parseToUnary("(-10)%(-3)")).toBe("(!10)%(!3)");
  });

  test("10 % (-3)", () => {
    expect(parseToUnary("10%(-3)")).toBe("10%(!3)");
  });

  test("(-10) % 3 + 5", () => {
    expect(parseToUnary("(-10)%3+5")).toBe("(!10)%3+5");
  });

  test("(-10) + (-20) * (-30)", () => {
    expect(parseToUnary("(-10)+(-20)*(-30)")).toBe("(!10)+(!20)*(!30)");
  });

  test("(-1) + (-2) + (-3)", () => {
    expect(parseToUnary("(-1)+(-2)+(-3)")).toBe("(!1)+(!2)+(!3)");
  });

  test("(-1) * (-2) * (-3)", () => {
    expect(parseToUnary("(-1)*(-2)*(-3)")).toBe("(!1)*(!2)*(!3)");
  });

  test("(-1) / (-2) / (-3)", () => {
    expect(parseToUnary("(-1)/(-2)/(-3)")).toBe("(!1)/(!2)/(!3)");
  });

  test("2 - 3 + 5", () => {
    expect(parseToUnary("2-3+5")).toBe("2-3+5");
  });
});
