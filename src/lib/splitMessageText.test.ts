import { splitMessageText } from "./splitMessageText";

describe("splitMessageText", () => {
  it("turns into array of words", () => {
    const split = splitMessageText("hi");
    expect(split.length).toBe(1);
    expect(split[0].word).toBe("hi");
  });

  it("splits on white space", () => {
    const split = splitMessageText("hello, brother");
    expect(split.length).toBe(2);
    expect(split[0].word).toBe("hello,");
    expect(split[1].word).toBe("brother");
  });

  it("adds url property", () => {
    const split = splitMessageText("http://pudim.com.br/");
    expect(split.length).toBe(1);
    expect(split[0].word).toBe("http://pudim.com.br/");
    expect(split[0].url).toBe("http://pudim.com.br/");
  });

  it("sets url property as null when word is not url", () => {
    const split = splitMessageText("check this: http://pudim.com.br/");
    expect(split.length).toBe(3);
    expect(split[0].word).toBe("check");
    expect(split[0].url).toBe(null);
    expect(split[1].word).toBe("this:");
    expect(split[1].url).toBe(null);
    expect(split[2].word).toBe("http://pudim.com.br/");
    expect(split[2].url).toBe("http://pudim.com.br/");
  });

  it("normalizes url", () => {
    const split = splitMessageText("pudim.com.br");
    expect(split.length).toBe(1);
    expect(split[0].word).toBe("pudim.com.br");
    expect(split[0].url).toBe("https://pudim.com.br");
  });
});
