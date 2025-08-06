import type { Message } from "@/types/Message";
import { useEffect, useState } from "react";

export const useMessages = (entityUrn: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getMessages = () => {
      setIsLoading(true);
      chrome.runtime.sendMessage({ type: "GET_MESSAGES", payload: entityUrn }, (response) => {
        if (response.success) {
          setMessages(response.data);
        } else {
          setMessages([]);
          console.error("Error:", response.error);
        }
        setIsLoading(false);
      });
    };
    getMessages();
  }, [entityUrn]);
  return {
    messages,
    setMessages,
    isLoading,
  };
};
