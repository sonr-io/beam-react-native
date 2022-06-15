const matrixIdPattern = /\@(.+):.*/;

export default (matrixId: string) => {
  const result = matrixIdPattern.exec(matrixId);
  if (!result) return matrixId;

  return result[1];
};
