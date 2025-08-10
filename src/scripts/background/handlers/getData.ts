import { getCache } from "../cache";
import { storage } from "../storage";

export const handleGetData = async (sendResponse: (data: unknown) => void) => {
  const cached = getCache("myData");
  if (cached) {
    sendResponse(cached);
    return;
  }
  const stored = await storage.get("myData");
  sendResponse(stored);
};
