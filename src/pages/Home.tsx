import type { MessengerConversation } from "@/types/MessengerConversation";
import { memo, useEffect, useState } from "react";
import { ParticipantCard } from "../components/ParticipantCard";
import { useNavigate } from "react-router";

export const HomeComponent = () => {
  const [conversations, setConversations] = useState<MessengerConversation[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    let canceled = false;
    chrome.runtime.sendMessage({ type: "GET_DATA" }, (response) => {
      if (!canceled) {
        setConversations((prev) => [...prev, ...(response || [])]);
        console.log("render");
      }
    });
    return () => {
      canceled = true;
    };
  }, []);

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <p>Нет данных</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 pb-4">
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
            onClick={() => {
              navigate(`/chat/${element.entityUrn}`);
            }}
            className="p-4 cursor-pointer"
          />
        );
      })}
    </div>
  );
};

export const Home = memo(HomeComponent);
