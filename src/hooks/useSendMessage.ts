
import { queryClient } from "@/App";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = (entityUrn: string, hostIdentityUrn: string) => {
  return useMutation({
    mutationFn: (messageText: string) =>
      new Promise<void>((resolve, reject) => {
        chrome.runtime.sendMessage(
          {
            type: "SEND_MESSAGE",
            payload: { entityUrn, hostIdentityUrn, messageText },
          },
          (response) => {
            if (response.success) {
              resolve();
            } else {
              reject(new Error(response.error || "Unknown error"));
            }
          }
        );
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", entityUrn] });
    },
  });
};
