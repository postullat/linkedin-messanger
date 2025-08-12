import { storage } from "../storage";

export const initCsrfTokenListener = () => {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      const token = details.requestHeaders?.find(
        (header) => header.name.toLowerCase() === "csrf-token"
      );
      if (token) {
        storage.set("token", token);
      }
      return undefined;
    },
    { urls: ["<all_urls>"] },
    ["requestHeaders", "extraHeaders"]
  );
};
