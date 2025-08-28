import { generateOriginToken, generateTrackingId } from "./utils";

export const linkedinApi = {
  async getConversationMessages(entityUrn: string, csrfToken: string) {
    const myHeaders = new Headers();
    myHeaders.append("csrf-token", csrfToken);
    myHeaders.append("Accept", "application/graphql");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow",
    };

    const encodedUrn = encodeURIComponent(entityUrn).replace(/\(/g, "%28").replace(/\)/g, "%29");

    const url = `https://www.linkedin.com/voyager/api/voyagerMessagingGraphQL/graphql?queryId=messengerMessages.29de52858e0fd96b4168ff9be9362b5e&variables=(conversationUrn:${encodedUrn})`;

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
  async getOldMessages(entityUrn: string,prevCursor:string, csrfToken: string) {
    const myHeaders = new Headers();
    myHeaders.append("csrf-token", csrfToken);
    myHeaders.append("Accept", "application/graphql");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow",
    };
    const encodedUrn = encodeURIComponent(entityUrn).replace(/\(/g, "%28").replace(/\)/g, "%29");

    const url = `https://www.linkedin.com/voyager/api/voyagerMessagingGraphQL/graphql?queryId=messengerMessages.0563a558c28c94833f7f35ce6d4155dd&variables=(conversationUrn:${encodedUrn},count:20,prevCursor:${prevCursor})`;

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.error(response, "response");
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
  async getMessagesByTimestamp(entityUrn: string, csrfToken: string, deliveredAt: number) {
    const myHeaders = new Headers();
    myHeaders.append("csrf-token", csrfToken);
    myHeaders.append("Accept", "application/graphql");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow",
    };
    const encodedUrn = encodeURIComponent(entityUrn).replace(/\(/g, "%28").replace(/\)/g, "%29");

    const url = `https://www.linkedin.com/voyager/api/voyagerMessagingGraphQL/graphql?queryId=messengerMessages.cbeff7626f577ed0bb86eee77ca82563&variables=(deliveredAt:${deliveredAt},conversationUrn:${encodedUrn},countBefore:20,countAfter:0)`;

    console.log(url, "getMessagesByTimestampURL");

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
  async sendMessage(
    entityUrn: string,
    hostIdentityUrn: string,
    csrfToken: string,
    messageText: string
  ) {
    const myHeaders = new Headers();
    myHeaders.append("csrf-token", csrfToken);
    myHeaders.append("Content-Type", "application/json");

    const body = {
      message: {
        body: {
          attributes: [],
          text: messageText,
        },
        renderContentUnions: [],
        conversationUrn: entityUrn,
        originToken: generateOriginToken(),
      },
      mailboxUrn: hostIdentityUrn,
      trackingId: generateTrackingId(),
      dedupeByClientGeneratedToken: false,
    };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      credentials: "include",
      body: JSON.stringify(body),
      redirect: "follow",
    };

    const url =
      "https://www.linkedin.com/voyager/api/voyagerMessagingDashMessengerMessages?action=createMessage";

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};
