import { linkedinApi } from "@/api/linkedinApi";
import { storage } from "../storage";

export const handleGetMessagesByTimestamp = async (
  entityUrn: string,
  deliveredAt: number,
  sendResponse: (...args: unknown[]) => unknown
) => {
  const csrfToken = await storage.get<{ name: string; value: string }>("token");
  if (!csrfToken?.value) {
    sendResponse({ success: false, error: "CSRF token not found" });
    return;
  }
  try {
    const data = await linkedinApi.getMessagesByTimestamp(entityUrn, csrfToken.value, deliveredAt);
    sendResponse({ success: true, data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
};
