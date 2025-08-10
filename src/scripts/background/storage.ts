export const storage = {
  set: (key: string, value: unknown) => chrome.storage.local.set({ [key]: value }),
  get: <T>(key: string): Promise<T> => 
    new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => resolve(result[key]));
    }),
};