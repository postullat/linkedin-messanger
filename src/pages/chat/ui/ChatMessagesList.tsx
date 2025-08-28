import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import type { Message } from "@/types/Message";
import { formatChatTimestamp } from "../utils/formatChatTimestamp";
import { useRef, useState, type ComponentProps } from "react";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@tanstack/react-query";
import { useMessages } from "@/hooks/useMessages";
import { useMessagesByTimeStamp } from "@/hooks/useMessagesByTimeStamp";
import { RefreshCcw } from "lucide-react";

interface ChatMessagesListProps extends ComponentProps<"div"> {
  entityUrn: string;
}

export const ChatMessagesList = (props: ChatMessagesListProps) => {
  const { entityUrn } = props;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const prevCursor = useRef<string | null | "initial">("initial");
  const [messagesByTimeStamp, setMessagesByTimeStamp] = useState<Message[]>([]);
  const [oldMessages, setOldMessages] = useState<Message[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const { data: messages = [] } = useMessages(entityUrn as string);

  const { refetch } = useMessagesByTimeStamp(
    entityUrn as string,
    messages[messages.length - 1].deliveredAt,
    {
      select: (data) => {
        return {
          messages: data.data.messengerMessagesByAnchorTimestamp.elements || [],
          prevCursor: data.data.messengerMessagesByAnchorTimestamp.metadata.prevCursor,
        };
      },
      enabled: false,
    }
  );

  const handleLoadMore = async () => {
    if (!scrollRef.current) return;
    if (prevCursor.current === "initial") {
      try {
        const { data } = await refetch();
        if (data) {
          prevCursor.current = data.prevCursor;
          if (data.prevCursor === null) {
            setIsFinished(true);
          }
          setMessagesByTimeStamp(data.messages ?? []);
          scrollRef.current.scrollTop = -1050;
        }
      } catch (error) {
        console.error("Error fetching messages by timestamp:", error);
      }
      return;
    }

    if (typeof prevCursor.current === "string") {
      try {
        const { data } = await oldMessagesQuery.refetch();
        if (data) {
          const elements = data.elements;
          prevCursor.current = data.metadata.prevCursor;
          if (data.metadata.prevCursor === null) {
            setIsFinished(true);
          }
          setOldMessages((old) => [...(elements ?? []), ...old]);
        }
      } catch (error) {
        console.error("Error fetching old messages:", error);
      }
    }
  };

  const oldMessagesQuery = useQuery({
    queryKey: ["oldMessages", entityUrn],
    queryFn: () =>
      new Promise<{
        elements: Message[];
        metadata: { prevCursor: string | null };
      }>((resolve, reject) => {
        chrome.runtime.sendMessage(
          {
            type: "GET_OLD_MESSAGES",
            payload: { entityUrn, prevCursor: prevCursor.current },
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
    enabled: false,
  });

  const messagesForRender = [
    ...messages,
    ...[...messagesByTimeStamp].reverse(),
    ...[...oldMessages].reverse(),
  ];

  return (
    <div
      id="scrollableDiv"
      className="h-[300px] overflow-y-auto flex flex-col-reverse relative"
      ref={scrollRef}
    >
      <InfiniteScroll
        dataLength={messagesForRender.length}
        next={handleLoadMore}
        inverse={true}
        hasMore={!isFinished}
        loader={<RefreshCcw className="m-auto animate-spin" />}
        scrollableTarget="scrollableDiv"
        className="flex flex-col-reverse gap-3 pt-5"
      >
        {messagesForRender.map((message, index) => (
          <ChatMessage message={message} key={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

function ChatMessage({ message }: { message: Message }) {
  const messageText = message.body.text;
  const member = message.sender.participantType.member;
  const profilePicture = member.profilePicture;
  const avatarUrl = getAvatarUrl(profilePicture);
  const isMe = member.distance === "SELF" ? true : false;
  return (
    <div className={`flex gap-3 flex-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className="h-8 w-8 mt-1 shrink-0">
        <AvatarImage src={avatarUrl ? avatarUrl : undefined} />
        <AvatarFallback>{member.firstName.text.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
        {!isMe && (
          <div className="text-sm font-medium text-foreground mb-1">{member.firstName.text}</div>
        )}
        <div
          className={`rounded-2xl px-4 py-2 max-w-full whitespace-pre-wrap break-words ${
            isMe ? "bg-blue-500 text-white ml-auto" : "bg-muted text-foreground"
          }`}
        >
          {messageText}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {formatChatTimestamp(message.deliveredAt)}
        </div>
      </div>
    </div>
  );
}
