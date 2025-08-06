import type { MessengerConversation } from "@/types/MessengerConversation";
import { useEffect, useState } from "react";
import { ParticipantCard } from "../components/ParticipantCard";
import { useNavigate } from "react-router";
export const Home = () => {
  const [conversations, setConversations] = useState<MessengerConversation[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_DATA" }, (response = []) => {
      setConversations((prev) => [...prev, ...response]);
    });
  }, []);

  // const getMessages = (entityUrn: string) => {
  //   console.log(entityUrn);
  //   chrome.runtime.sendMessage(
  //     { type: "GET_LINKEDIN_MESSAGES", payload: entityUrn },
  //     (response) => {
  //       if (response.success) {
  //         console.log("Messages:", response.data);
  //       } else {
  //         console.error("Error:", response.error);
  //       }
  //     }
  //   );
  // };

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <p>Нет данных</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
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
              navigate(`/chat/${element.entityUrn}`)
            }}
            className="p-4"
          />
        );
      })}
    </div>
  );
};
