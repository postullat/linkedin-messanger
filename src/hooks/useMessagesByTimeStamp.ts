import type { Message } from "@/types/Message";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type UseMessagesByTimeStampResponse = {
  data: {
    messengerMessagesByAnchorTimestamp: {
      elements: Message[];
      metadata: {
        prevCursor: string | null;
      };
    };
  };
};

type UseMessagesByTimeStampOptions = Omit<
  UseQueryOptions<
    UseMessagesByTimeStampResponse,
    Error,
    {
      messages: Message[];
      prevCursor: string | null;
    }
  >,
  "queryKey" | "queryFn"
>;

export const useMessagesByTimeStamp = (
  entityUrn: string,
  deliveredAt: number,
  options: UseMessagesByTimeStampOptions
) => {
  return useQuery({
    queryKey: ["messagesByTimeStamp", entityUrn],
    queryFn: () =>
      new Promise<UseMessagesByTimeStampResponse>((resolve, reject) => {
        chrome.runtime.sendMessage(
          {
            type: "GET_MESSAGES_BY_TIMESTAMP",
            payload: { entityUrn, deliveredAt },
          },
          (response) => {
            if (response.success) {
              resolve(response.data);
            } else {
              reject(new Error(response.error));
            }
          }
        );
      }),
    ...options,
  });
};
