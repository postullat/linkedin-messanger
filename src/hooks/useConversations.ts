import type { MessengerConversation } from "@/types/MessengerConversation";
import { useEffect, useState } from "react";

export const useConversations = () => {
  const [conversations, setConversations] = useState<MessengerConversation[]>([]);
  useEffect(() => {
    let canceled = false;
    chrome.runtime.sendMessage({ type: "GET_DATA" }, (response) => {
      if (!canceled) {
        setConversations((prev) => [...prev, ...(response || [])]);
      }
    });
    return () => {
      canceled = true;
    };
  }, []);
  return {
    conversations,
  };
};
