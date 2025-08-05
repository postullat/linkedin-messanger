let cachedData = null;

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
