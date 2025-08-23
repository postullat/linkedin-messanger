import { storage } from "../storage";
import { linkedinApi } from "@/api/linkedinApi";

export const handleGetOldMessages = async (entityUrn: string, sendResponse: (...args:unknown[]) => unknown) => {
  const csrfToken = await storage.get<{ name: string; value: string }>("token");
  if (!csrfToken?.value) {
    sendResponse({ success: false, error: "CSRF token not found" });
    return;
  }
  try {
    const data = await linkedinApi.getOldMessages(entityUrn, csrfToken.value);
    sendResponse({ success: true, data: data.data.messengerMessagesByConversation.elements });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
};