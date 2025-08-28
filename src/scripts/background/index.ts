import { initCsrfTokenListener } from "./listeners/csrf-token";
import { handleGetData } from "./handlers/getData";
import { handleGetMessages } from "./handlers/getMessages";
import { handleSendMessage } from "./handlers/sendMessage";
import { setCache } from "./cache";
import { storage } from "./storage";
import { handleGetOldMessages } from "./handlers/getOldMessages";
import { handleGetMessagesByTimestamp } from "./handlers/getMessagesByTimestamp";

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
    const { entityUrn ,prevCursor} = message.payload;
    handleGetOldMessages(entityUrn,prevCursor, sendResponse);
    return true;
  }

  if (message.type === "GET_MESSAGES_BY_TIMESTAMP") {
    const { entityUrn, deliveredAt } = message.payload;
    handleGetMessagesByTimestamp(entityUrn, deliveredAt, sendResponse);
    return true;
  }

  if (message.type === "SEND_MESSAGE") {
    handleSendMessage({ payload: message.payload, sendResponse });
    return true;
  }
});
