import { ParticipantCard } from "../components/ParticipantCard";
import { useNavigate } from "react-router";
import { useConversations } from "@/hooks/useConversations";
import { useState } from "react";
import classNames from "classnames";
import type { Member } from "@/types/Member";
import { useChatStore } from "@/store/useChatStore";
import { LayoutWithProfileWidget } from "@/shared/layouts/LayoutWithProfileWidget";

export const Home = () => {
  const navigate = useNavigate();
  const { conversations } = useConversations();
  const { activeMember, setActiveMember } = useChatStore();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  const handleClick = (entityUrn: string, member: Member) => {
    setActiveConversation(entityUrn);
    setActiveMember(member);
  };

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <p>Нет данных</p>
      </div>
    );
  }

  return (
    <LayoutWithProfileWidget
      className={classNames(
        "gap-2",
        activeMember ? "grid grid-cols-2 w-[550px]" : "w-[350px]  grid grid-cols-1"
      )}
    >
      <div className="flex flex-col gap-3 pb-4 max-h-[400px] overflow-scroll">
        {conversations.map((conversation) => {
          const participant =
            conversation.conversationParticipants.find(
              (participant) => participant.participantType.member.distance !== "SELF"
            ) || conversation.conversationParticipants[0];
          const member = participant.participantType.member;
          const profilePicture = member.profilePicture;
          const selfProfleData = conversation.conversationParticipants.find(
            (conversationParticipant) =>
              conversationParticipant.participantType.member.distance === "SELF"
          );
          return (
            <ParticipantCard
              key={conversation.createdAt}
              imageUrl={
                profilePicture.rootUrl + profilePicture.artifacts[1].fileIdentifyingUrlPathSegment
              }
              firstName={member.firstName.text}
              lastName={member.lastName.text}
              profileUrl={member.profileUrl}
              onClick={() => {
                handleClick(conversation.entityUrn, member);
              }}
              onDoubleClick={() => {
                navigate(`/chat/${conversation.entityUrn}`, {
                  state: { selfProfleData },
                });
              }}
              lastActivityAt={conversation.lastActivityAt}
              className={classNames("p-4 cursor-pointer", {
                "bg-gray-100": activeConversation === conversation.entityUrn,
              })}
            />
          );
        })}
      </div>
    </LayoutWithProfileWidget>
  );
};
