import { useQuery } from "@tanstack/react-query";
import type { Message } from "@/types/Message";

export const useOldMessages = (entityUrn: string) => {
  return useQuery<Message[], Error>({
    queryKey: ["oldMessages", entityUrn],
    queryFn: () =>
      new Promise<Message[]>((resolve, reject) => {
        chrome.runtime.sendMessage({ type: "GET_OLD_MESSAGES", payload: entityUrn }, (response) => {
          if (response.success) {
            resolve(response.data);
          } else {
            reject(new Error(response.error));
          }
        });
      }),
  });
};
