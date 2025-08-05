const script = document.createElement("script");
script.src = chrome.runtime.getURL("injected.js");
script.onload = function () {
  this.remove();
};
script.onerror = function (error) {
  console.error("Failed to load injected script:", error);
};

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data && !event.data.source === "my-injected-script") return;
  chrome.runtime.sendMessage({
    type: "FROM_PAGE",
    payload: event.data.payload,
  });
});

(document.head || document.documentElement).appendChild(script);
