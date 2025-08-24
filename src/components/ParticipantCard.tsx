import type { ComponentProps } from "react";
import { Card } from "./ui/Card";
import classNames from "classnames";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

function timeAgo(timestamp: number) {
  const now = Date.now();
  const diff = timestamp - now; // разница (будущее/прошлое)
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (Math.abs(seconds) < 60) return rtf.format(seconds, "second");
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  if (Math.abs(days) < 30) return rtf.format(days, "day");
  if (Math.abs(months) < 12) return rtf.format(months, "month");
  return rtf.format(years, "year");
}

interface ParticipantCardProps extends ComponentProps<"div"> {
  imageUrl: string | null;
  firstName: string;
  lastName: string;
  profileUrl: string;
  lastActivityAt: number;
}

export const ParticipantCard = (props: ParticipantCardProps) => {
  const { imageUrl, firstName, lastName, lastActivityAt, ...rest } = props;
  return (
    <Card {...rest} className={classNames("flex flex-row items-center gap-0", props.className)}>
      <Avatar>
        <AvatarImage src={imageUrl ? imageUrl : undefined} alt={firstName + lastName} />
        <AvatarFallback className="text-lg font-semibold bg-gray-100">{firstName[0]}</AvatarFallback>
      </Avatar>
      <span className="font-bold ml-2">
        {firstName} {lastName}
      </span>
      <span className="ml-auto opacity-50">{timeAgo(lastActivityAt)}</span>
    </Card>
  );
};
