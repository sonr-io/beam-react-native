import nameFromMatrixId from "./nameFromMatrixId";

describe("nameFromMatrixId", () => {
  it("extracts name", () => {
    expect(nameFromMatrixId("@name:matrix.org")).toBe("name");
  });

  it("returns input if not a valid id", () => {
    expect(nameFromMatrixId("dracarys")).toBe("dracarys");
  });
});
