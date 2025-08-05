import type { MessengerConversation } from "@/types/MessengerConversation";
import { useEffect, useState } from "react";
import { ParticipantCard } from "./ParticipantCard";

export const Popup = () => {
  const [conversations, setConversations] = useState<MessengerConversation[]>([]);
  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_DATA" }, (response = []) => {
      setConversations((prev) => [...prev, ...response]);
    });
  }, []);

  if (!conversations || conversations.length === 0) {
    return (
      <div className="w-[300px] py-4 px-5 flex flex-col gap-3">
        <p>Нет данных</p>
      </div>
    );
  }
  
  return (
    <div className="w-[300px] py-4 px-5 flex flex-col gap-3">
      {conversations.map((element) => {
        const participant = element.conversationParticipants[0];
        const member = participant.participantType.member;
        const profilePicture = member.profilePicture;
        return (
          <ParticipantCard
            key={element.backendUrn}
            imageUrl={
              profilePicture.rootUrl + profilePicture.artifacts[1].fileIdentifyingUrlPathSegment
            }
            firstName={member.firstName.text}
            lastName={member.lastName.text}
            profileUrl={member.profileUrl}
            className="p-4"
          />
        );
      })}
    </div>
  );
}