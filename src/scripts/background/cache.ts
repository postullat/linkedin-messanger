const cache: Record<string, unknown> = {};

export const setCache = (key: string, value: unknown) => {
  cache[key] = value;
};

export const getCache = (key: string) => cache[key];
