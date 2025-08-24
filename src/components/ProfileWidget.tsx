import { Card, CardContent } from "./ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ExternalLink, Linkedin } from "lucide-react";
import type { ComponentProps } from "react";
import classNames from "classnames";


interface ProfileWidgetProps extends ComponentProps<"div"> {
  fullName: string;
  description: string;
  avatarUrl: string;
  profileUrl: string;
}

export const ProfileWidget = (props: ProfileWidgetProps) => {
  const { fullName, description, avatarUrl, profileUrl ,...rest} = props;
  return (
    <Card {...rest} className={classNames("p-0 shadow-sm border border-gray-200",props.className)}>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} alt={fullName} className="rounded-full"/>
            <AvatarFallback className="text-lg font-semibold bg-gray-100">
              {fullName}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">{fullName}</h3>
            <p className="text-[12px] text-gray-600 mt-1 line-clamp-3">{description}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div
            className="flex items-center rounded-md cursor-pointer"
            onClick={() => window.open(profileUrl, "_blank")}
          >
            <Linkedin className="w-4 h-4 text-[#000]" />
            <span className="ml-2">Visit profile</span>
            <ExternalLink className="ml-auto w-4 h-4"/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
