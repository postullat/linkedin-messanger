/* eslint-disable @typescript-eslint/no-explicit-any */
let cachedData:any = null;

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    if (details.url.includes("messengerMessages")) {
      const token = details.requestHeaders?.find(header => header.name.toLocaleLowerCase() === "csrf-token");
      chrome.storage.local.set({ token });
    }
    return undefined;
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders","extraHeaders"]
);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "FROM_PAGE") {
    if (message.payload && message.payload.length > 0) {
      cachedData = message.payload;
      chrome.storage.local.set({ myData: cachedData }, () => {
        console.log("Данные сохранены в storage:", cachedData);
      });
    }
  }
});

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.type === "GET_DATA") {
    if (cachedData) {
      sendResponse(cachedData);
    } else {
      chrome.storage.local.get("myData", (result) => {
        console.log("Данные из storage:", result.myData);
        sendResponse(result.myData);
      });
      return true;
    }
  }
});



import { linkedinApi } from "@/api/linkedinApi"

chrome.runtime.onMessage.addListener((message,_, sendResponse) => {
  if (message.type === "GET_MESSAGES") {
    const entityUrn = message.payload;
    chrome.storage.local.get("token", async (result) => {
      const tokenHeader = result.token;

      if (!tokenHeader || !tokenHeader.value) {
        sendResponse({ success: false, error: "CSRF token not found" });
        return;
      }

      try {
        const data = await linkedinApi.getConversationMessages(entityUrn, tokenHeader.value);
        sendResponse({ success: true, data: data.data.messengerMessagesBySyncToken.elements });
      } catch (error: any) {
        sendResponse({ success: false, error: error.message });
      }
    });

    return true;
  }
});

