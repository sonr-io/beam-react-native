const URLPattern = /^([a-z]*:\/\/)?(.*\.([a-z]{2,6})(\/.*)?)$/;

export const normalizeUrl = (candidate: string) => {
  const result = URLPattern.exec(candidate);

  if (!result) {
    return null;
  }

  const [_, protocol, rest] = result;

  return `${protocol ?? "https://"}${rest}`;
};
