// /* eslint-disable @typescript-eslint/no-explicit-any */
// let cachedData: any = null;
// import { linkedinApi } from "@/api/linkedinApi";

// chrome.webRequest.onBeforeSendHeaders.addListener(
//   function (details) {
//     if (details.url.includes("messengerMessages")) {
//       const token = details.requestHeaders?.find(
//         (header) => header.name.toLocaleLowerCase() === "csrf-token"
//       );
//       chrome.storage.local.set({ token });
//     }
//     return undefined;
//   },
//   { urls: ["<all_urls>"] },
//   ["requestHeaders", "extraHeaders"]
// );

// chrome.runtime.onMessage.addListener((message) => {
//   if (message.type !== "FROM_PAGE") return;
//   const payload = message.payload;
//   if (payload && payload.length > 0) {
//     cachedData = message.payload;
//     chrome.storage.local.set({ myData: cachedData });
//   }
// });

// chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
//   if (msg.type === "GET_DATA") {
//     if (cachedData) {
//       sendResponse(cachedData);
//     } else {
//       chrome.storage.local.get("myData", (result) => {
//         console.log("Данные из storage:", result.myData);
//         sendResponse(result.myData);
//       });
//       return true;
//     }
//   }
// });

// chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
//   if (message.type === "GET_MESSAGES") {
//     const entityUrn = message.payload;
//     chrome.storage.local.get("token", async (result) => {
//       const tokenHeader = result.token;

//       if (!tokenHeader || !tokenHeader.value) {
//         sendResponse({ success: false, error: "CSRF token not found" });
//         return;
//       }

//       try {
//         const data = await linkedinApi.getConversationMessages(entityUrn, tokenHeader.value);
//         sendResponse({ success: true, data: data.data.messengerMessagesBySyncToken.elements });
//       } catch (error: any) {
//         sendResponse({ success: false, error: error.message });
//       }
//     });

//     return true;
//   }
//   if (message.type === "SEND_MESSAGE") {
//     chrome.storage.local.get("token", async (result) => {
//       const csrfToken = result.token;
//       if (!csrfToken || !csrfToken.value) {
//         sendResponse({ success: false, error: "CSRF token not found" });
//         return;
//       }
//       const entityUrn = message.payload.entityUrn;
//       const hostIdentityUrn = message.payload.hostIdentityUrn;
//       try {
//         const data = await linkedinApi.sendMessage(entityUrn, hostIdentityUrn,csrfToken.value);
//         sendResponse({ success: true, data });
//       } catch (error: any) {
//         sendResponse({ success: false, error: error.message });
//       }
//     });
//   }
// });

import { initCsrfTokenListener } from "./listeners/csrf-token";
import { handleGetData } from "./handlers/getData";
import { handleGetMessages } from "./handlers/getMessages";
import { handleSendMessage } from "./handlers/sendMessage";
import { setCache } from "./cache";
import { storage } from "./storage";

initCsrfTokenListener();

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === "FROM_PAGE" && message.payload?.length > 0) {
    setCache("myData", message.payload);
    storage.set("myData", message.payload);
  }

  if (message.type === "GET_DATA") {
    handleGetData(sendResponse);
    return true;
  }

  if (message.type === "GET_MESSAGES") {
    handleGetMessages(message.payload, sendResponse);
    return true;
  }

  if (message.type === "SEND_MESSAGE") {
    handleSendMessage({ payload: message.payload, sendResponse });
    return true;
  }
});
