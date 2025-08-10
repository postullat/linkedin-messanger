import type { Member } from "./Member";

export interface Message {
  actor: {
    participantType: {
      member: Member;
    };
  };
  body: {
    text: string;
  };
  sender: {
    participantType: {
      member: Member;
    };
  };
  deliveredAt: number;
  originToken: string;
}
