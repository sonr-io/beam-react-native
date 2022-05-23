import { normalizeUrl } from "./normalizeUrl";

describe("normalizeUrl", () => {
  it("normalizes URLs", () => {
    expect(normalizeUrl("google.com")).toBe("https://google.com");
    expect(normalizeUrl("twitter.com")).toBe("https://twitter.com");
    expect(normalizeUrl("ae.studio")).toBe("https://ae.studio");
    expect(normalizeUrl("www.msn.com")).toBe("https://www.msn.com");
    expect(normalizeUrl("http://google.com")).toBe("http://google.com");
    expect(normalizeUrl("ftp://ftpserver.com")).toBe("ftp://ftpserver.com");
  });

  it("returns null if the candidate is not a URL", () => {
    expect(normalizeUrl("word")).toBe(null);
    expect(normalizeUrl("this is a phrase")).toBe(null);
    expect(normalizeUrl("word.")).toBe(null);
  });
});
