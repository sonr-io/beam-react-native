const URLPattern = /^(https?:\/\/)?(.*\.(com|io|org|studio)(\/.*)?)$/;

export const normalizeUrl = (candidate: string) => {
  const result = URLPattern.exec(candidate);

  if (!result) {
    return null;
  }

  const [_, protocol, rest] = result;

  return `${protocol ?? "https://"}${rest}`;
};
