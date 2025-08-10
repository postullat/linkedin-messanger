import { useQuery } from "@tanstack/react-query";
import type { Message } from "@/types/Message";

export const useMessages = (entityUrn: string) => {
  return useQuery<Message[], Error>({
    queryKey: ["messages", entityUrn],
    queryFn: () =>
      new Promise<Message[]>((resolve, reject) => {
        chrome.runtime.sendMessage(
          { type: "GET_MESSAGES", payload: entityUrn },
          (response) => {
            if (response.success) {
              resolve(response.data);
            } else {
              reject(new Error(response.error));
            }
          }
        );
      }),
    refetchInterval: 5000,
  });
};