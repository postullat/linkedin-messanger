// Injected script that runs in page context to intercept fetch requests
(function () {
  console.log("start");

  // Store original fetch
  const originalFetch = window.fetch;

  // Listen for messages from the content script
  window.addEventListener("message", function (event) {
    if (event.data.type === "EXECUTE_GRAPHQL") {
      console.log("[FB Ads Interceptor] Received GraphQL request:", event.data.payload);

      const { url, method, formData } = event.data.payload;

      console.log("[FB Ads Interceptor] Final request body string:", formData);

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          Origin: "https://www.facebook.com",
          Referer: "https://www.facebook.com/",
          "User-Agent": navigator.userAgent,
        },
        body: formData,
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("[FB Ads Interceptor] GraphQL response:", data);

          // Send response back to content script
          window.postMessage(
            {
              type: "GRAPHQL_RESPONSE",
              response: data,
            },
            "*"
          );
        })
        .catch((error) => {
          console.error("[FB Ads Interceptor] GraphQL request failed:", error);

          // Send error back to content script
          window.postMessage(
            {
              type: "GRAPHQL_RESPONSE",
              response: {
                error: error.message,
              },
            },
            "*"
          );
        });
    }
    console.log("[FB Ads Interceptor] Received GraphQL request:", event.data.payload);
    console.log(event);

    const { url, method, formData } = event.data.payload;

    console.log("[FB Ads Interceptor] Final request body string:", formData);

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://www.facebook.com",
        Referer: "https://www.facebook.com/",
        "User-Agent": navigator.userAgent,
      },
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("[FB Ads Interceptor] GraphQL response:", data);

        // Send response back to content script
        window.postMessage(
          {
            type: "GRAPHQL_RESPONSE",
            response: data,
          },
          "*"
        );
      })
      .catch((error) => {
        console.error("[FB Ads Interceptor] GraphQL request failed:", error);

        // Send error back to content script
        window.postMessage(
          {
            type: "GRAPHQL_RESPONSE",
            response: {
              error: error.message,
            },
          },
          "*"
        );
      });
  });

  function parseRequestBody(body) {
    try {
      if (typeof body === "string") {
        // Parse URL-encoded form data
        const params = new URLSearchParams(body);
        const formData = {};

        // Get all parameters
        for (const [key, value] of params.entries()) {
          if (key === "variables" && value) {
            try {
              formData[key] = JSON.parse(value);
            } catch (e) {
              formData[key] = value;
            }
          } else {
            formData[key] = value;
          }
        }

        return formData;
      } else if (body instanceof FormData) {
        const formData = {};
        for (const [key, value] of body.entries()) {
          if (key === "variables" && value) {
            try {
              formData[key] = JSON.parse(value);
            } catch (e) {
              formData[key] = value;
            }
          } else {
            formData[key] = value;
          }
        }
        return formData;
      } else if (body instanceof URLSearchParams) {
        const formData = {};
        for (const [key, value] of body.entries()) {
          if (key === "variables" && value) {
            try {
              formData[key] = JSON.parse(value);
            } catch (e) {
              formData[key] = value;
            }
          } else {
            formData[key] = value;
          }
        }
        return formData;
      }
      return null;
    } catch (error) {
      console.error("[FB Ads Interceptor] Error parsing request body:", error);
      return null;
    }
  }

  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input.url;
    const method = init?.method || "GET";
    const body = init?.body;

    const response = await originalFetch.apply(this, arguments);

    // Клонируем response, чтобы не мешать оригинальному потоку
    const clone = response.clone();

    clone
      .json()
      .then((text) => {
        // console.log("[FB Ads Interceptor] Fetch response:", {
        //   url,
        //   method,
        //   body: parseRequestBody(body),
        //   responseText: text
        // });
        if (
          url.includes("linkedin.com") &&
          method === "GET" &&
          url.includes("messengerConversations")
        ) {
        //   console.log(text);
          console.log(text.data.messengerConversationsBySyncToken.elements);
          console.log(text.data.messengerConversationsBySyncToken.elements[0].conversationParticipants,"conversationParticipants");
          console.log(text.data.messengerConversationsBySyncToken.elements[0].messages,"messages");
          console.log("our data ======================");
        }
      })
      .catch((error) => {
        console.error("[FB Ads Interceptor] Error reading fetch response:", error);
      });

    return response;
  };

  // Intercept XMLHttpRequest
  // const originalXHROpen = XMLHttpRequest.prototype.open;
  // const originalXHRSend = XMLHttpRequest.prototype.send;

  // XMLHttpRequest.prototype.open = function (method, url) {
  //   // console.log(method, url);
  //   // console.log("method", "url", "========");

  //   this._method = method;
  //   this._url = url;
  //   return originalXHROpen.apply(this, arguments);
  // };

  // XMLHttpRequest.prototype.send = function (body) {
  //   // if (isGraphQLRequest(this._url, this._method, body)) {
  //   if (
  //     this._url.includes("linkedin.com") &&
  //     method === "GET" &&
  //     this._url.includes("messengerConversations")
  //   ) {
  //     const parsedBody = parseRequestBody(body);
  //     console.log("[FB Ads Interceptor] Intercepted GraphQL XHR request:", {
  //       url: this._url,
  //       method: this._method,
  //       body: parsedBody,
  //     });

  //     // Dispatch event with request details
  //     window.dispatchEvent(
  //       new CustomEvent("GRAPHQL_INTERCEPTED", {
  //         detail: {
  //           url: this._url,
  //           method: this._method,
  //           ...parsedBody,
  //         },
  //       })
  //     );
  //   }
  //   // }

  //   return originalXHRSend.apply(this, arguments);
  // };

  // if (window.__fbGraphQLRequest) {
  //   const originalFBGraphQLRequest = window.__fbGraphQLRequest;
  //   window.__fbGraphQLRequest = function (...args) {
  //     //   console.log("[FB Ads Interceptor] Facebook internal GraphQL request:", args);
  //     return originalFBGraphQLRequest.apply(this, args);
  //   };
  // }

  // if (window.__fbFetch) {
  //   const originalFBFetch = window.__fbFetch;
  //   window.__fbFetch = function (...args) {
  //     //   console.log("[FB Ads Interceptor] Facebook internal fetch:", args);
  //     return originalFBFetch.apply(this, args);
  //   };
  // }

  //   console.log("[FB Ads Interceptor] All interceptors installed");
})();

// async function sendRequest(requestData) {
//   try {
//     const formData = new URLSearchParams();

//     for (const [key, value] of Object.entries(requestData)) {
//       if (key === "variables") {
//         formData.append(key, JSON.stringify(value));
//       } else {
//         formData.append(key, String(value));
//       }
//     }

//     const response = await fetch("https://www.facebook.com/api/graphql/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Accept: "*/*",
//         "Accept-Language": "en-US,en;q=0.9",
//         Origin: "https://www.facebook.com",
//         Referer: "https://www.facebook.com/",
//         "User-Agent": navigator.userAgent,
//       },
//       body: formData.toString(),
//       credentials: "include",
//     });

//     const data = await response.text();
//     console.log("Response:", data);
//     return data;
//   } catch (error) {
//     console.error("Error sending request:", error);
//     throw error;
//   }
// }
