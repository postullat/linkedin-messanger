import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

type UseSendMessageOptions = {
  mutationOptions: Partial<UseMutationOptions<void, Error, string, unknown>>;
};

type UseSendMessageArgs = {
  entityUrn: string;
  hostIdentityUrn: string;
};

type UseSendMessageProps = UseSendMessageArgs & UseSendMessageOptions;

export const useSendMessage = (props: UseSendMessageProps) => {
  const { entityUrn, hostIdentityUrn, mutationOptions } = props;
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
    ...mutationOptions,
  });
};
