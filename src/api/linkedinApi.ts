export const linkedinApi = {
  async getConversationMessages(entityUrn: string, csrfToken: string) {
    const myHeaders = new Headers();
    myHeaders.append("csrf-token", csrfToken);
    myHeaders.append("Accept", "application/graphql");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow"
    };

    const encodedUrn = encodeURIComponent(entityUrn)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29");

    const url = `https://www.linkedin.com/voyager/api/voyagerMessagingGraphQL/graphql?queryId=messengerMessages.455dde239612d966346c1d1c4352f648&variables=(conversationUrn:${encodedUrn})`;

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
};
