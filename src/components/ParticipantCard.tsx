import type { ComponentProps } from "react";
import { Card } from "./ui/Card";
import classNames from "classnames";
import { Button } from "./ui/Button";

interface ParticipantCardProps extends ComponentProps<"div"> {
  imageUrl: string;
  firstName: string;
  lastName: string;
  profileUrl: string;
}

export const ParticipantCard = (props: ParticipantCardProps) => {
  const { imageUrl, firstName, lastName, profileUrl, ...rest } = props;

  const handleClickVisit = () => {
    window.open(profileUrl, "_blank");
  };

  return (
    <Card {...rest} className={classNames("flex flex-row justify-between", props.className)}>
      <div>
        <img src={imageUrl} className="w-10 h-10 rounded-full mb-2" />
        <span className="font-bold">
          {firstName} {lastName}
        </span>
      </div>
      <Button onClick={handleClickVisit}>Visit</Button>
    </Card>
  );
};
