import { initCsrfTokenListener } from "./listeners/csrf-token";
import { handleGetData } from "./handlers/getData";
import { handleGetMessages } from "./handlers/getMessages";
import { handleSendMessage } from "./handlers/sendMessage";
import { setCache } from "./cache";
import { storage } from "./storage";
import { handleGetOldMessages } from "./handlers/getOldMessages";

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

  if (message.type === "GET_OLD_MESSAGES") {
    handleGetOldMessages(message.payload, sendResponse);
    return true;
  }

  if (message.type === "SEND_MESSAGE") {
    handleSendMessage({ payload: message.payload, sendResponse });
    return true;
  }
});
