import { ProfileWidget } from "@/components/ProfileWidget";
import { getAvatarUrl } from "@/pages/chat/utils/getAvatarUrl";
import { useChatStore } from "@/store/useChatStore";
import type { ComponentProps, ReactNode } from "react";

interface LayoutWithProfileWidgetProps extends ComponentProps<"div"> {
  children: ReactNode;
}
export const LayoutWithProfileWidget = (props: LayoutWithProfileWidgetProps) => {
  const { children } = props;
  const { activeMember } = useChatStore();
  return (
    <div className={props.className}>
      {children}
      {activeMember && (
        <ProfileWidget
          fullName={`${activeMember.firstName.text} ${activeMember.lastName.text}`}
          description={activeMember.headline.text}
          avatarUrl={getAvatarUrl(activeMember.profilePicture)}
          profileUrl={activeMember.profileUrl}
          className="h-fit"
        />
      )}
    </div>
  );
};
