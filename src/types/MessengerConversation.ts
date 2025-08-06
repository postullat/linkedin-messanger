import type { Member } from "./Member";


interface ParticipantType {
    member: Member;
}

interface ConversationParticipant {
    memberBadgeType: string;
    participantType: ParticipantType;
}

export interface MessengerConversation {
    backendUrn: string;
    categories: string[];
    conversationParticipants: ConversationParticipant[];
    notificationStatus: string;
    entityUrn: string;
}