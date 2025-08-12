import { storage } from "../storage";
import { linkedinApi } from "@/api/linkedinApi";

interface HandleSendMessageArgs {
  payload: {
    entityUrn: string;
    hostIdentityUrn: string;
    messageText: string;
  };
  sendResponse: (...args: unknown[]) => unknown;
}

export const handleSendMessage = async (args: HandleSendMessageArgs) => {
  const { payload, sendResponse } = args;
  const { entityUrn, hostIdentityUrn, messageText } = payload;

  const csrfToken = await storage.get<{ name: string; value: string }>("token");

  if (!csrfToken?.value) {
    sendResponse({ success: false, error: "CSRF token not found" });
    return;
  }

  try {
    const data = await linkedinApi.sendMessage(
      entityUrn,
      hostIdentityUrn,
      csrfToken.value,
      messageText
    );
    sendResponse({ success: true, data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
};
