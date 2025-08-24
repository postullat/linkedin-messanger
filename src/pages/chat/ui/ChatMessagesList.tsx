import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import type { Message } from "@/types/Message";
import { formatChatTimestamp } from "../utils/formatChatTimestamp";
import { useEffect, useRef } from "react";

interface ChatMessagesListProps {
  messages: Message[];
}

export const ChatMessagesList = (props: ChatMessagesListProps) => {
  const { messages } = props;
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);
  return (
    <div className="flex flex-col flex-1 gap-4 max-h-[300px] overflow-scroll">
      {messages.map((message, index) => {
        const messageText = message.body.text;
        const member = message.sender.participantType.member;
        const profilePicture = member.profilePicture;
        const avatarUrl =
          profilePicture.rootUrl + profilePicture.artifacts[1].fileIdentifyingUrlPathSegment;
        const isMe = member.distance === "SELF" ? true : false;
        return (
          <>
            <div
              key={index}
              className={`flex gap-3 flex-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}
            >
              <Avatar className="h-8 w-8 mt-1 shrink-0">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{member.firstName.text.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
                {!isMe && (
                  <div className="text-sm font-medium text-foreground mb-1">
                    {member.firstName.text}
                  </div>
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
          </>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};
