import { create } from "zustand";
import type { Member } from "@/types/Member";

interface ChatState {
  activeMember: Member | null;
  setActiveMember: (member: Member | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeMember: null,
  setActiveMember: (member: Member | null) => set({ activeMember: member }),
}));
