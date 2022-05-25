import { splitMessageText } from "./splitMessageText";

describe("splitMessageText", () => {
  it("turns into array of words", () => {
    const split = splitMessageText("hi");
    expect(split.length).toBe(1);
    expect(split[0].word).toBe("hi");
  });

  it("splits on space", () => {
    const split = splitMessageText("hello brother");
    expect(split.length).toBe(2);
    expect(split[0].word).toBe("hello");
    expect(split[1].word).toBe("brother");
  });

  it("splits on separators other than space", () => {
    const split = splitMessageText("Sugar,\nsugar");
    expect(split.length).toBe(2);
    expect(split[0].word).toBe("Sugar");
    expect(split[1].word).toBe("sugar");
  });

  it("includes separators", () => {
    const split = splitMessageText("Sugar (sweet)");
    expect(split.length).toBe(2);
    expect(split[0].word).toBe("Sugar");
    expect(split[0].separator).toBe(" (");
    expect(split[1].word).toBe("sweet");
    expect(split[1].separator).toBe(")");
  });

  it("adds url property", () => {
    const split = splitMessageText("http://pudim.com.br/");
    expect(split[0].word).toBe("http://pudim.com.br/");
    expect(split[0].url).toBe("http://pudim.com.br/");
  });

  it("sets url property as null when word is not url", () => {
    const split = splitMessageText("SUGAR: http://pudim.com.br/");
    expect(split[0].word).toBe("SUGAR:");
    expect(split[0].url).toBe(null);
  });

  it("normalizes url", () => {
    const split = splitMessageText("pudim.com.br");
    expect(split[0].word).toBe("pudim.com.br");
    expect(split[0].url).toBe("https://pudim.com.br");
  });
});
