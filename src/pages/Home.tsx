import { ParticipantCard } from "../components/ParticipantCard";
import { useNavigate } from "react-router";
import { useConversations } from "@/hooks/useConversations";

export const Home = () => {
  const { conversations } = useConversations();
  const navigate = useNavigate();
  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <p>Нет данных</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 pb-4">
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
              navigate(`/chat/${conversation.entityUrn}`, {
                state: { selfProfleData },
              });
            }}
            className="p-4 cursor-pointer"
          />
        );
      })}
    </div>
  );
};
