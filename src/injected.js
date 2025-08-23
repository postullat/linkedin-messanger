const queryId = "messengerConversations";

const isRequiredRequest = (url, method) => {
  return url.includes("linkedin.com") && method === "GET" && url.includes(queryId) && !url.includes("syncToken");
};

const windowPostMessage = (source, payload) => {
  const config = {
    source,
    payload,
  };
  window.postMessage(config, "*");
};

function init() {
  const originalFetch = window.fetch;

  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input.url;
    const method = init?.method || "GET";

    if (!isRequiredRequest(url, method)) {
      return originalFetch.apply(this, arguments);
    }

    const response = await originalFetch.apply(this, arguments);
    const clone = response.clone();

    try {
      const data = await clone.json();
      const conversations = data?.data?.messengerConversationsBySyncToken?.elements;
      windowPostMessage("my-injected-script",conversations);
    } catch (error) {
      console.error(error);
    }

    return response;
  };
}

init();