import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/textarea";
import classNames from "classnames";
import { Loader, Send } from "lucide-react";
import { type ChangeEvent, type ComponentProps } from "react";

interface ChatActionsProps extends Omit<ComponentProps<"div">, "onChange"> {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  isSending: boolean;
}

export const ChatActions = (props: ChatActionsProps) => {
  const { value, onChange, onSend, isSending, ...rest } = props;

  return (
    <div
      className={classNames("border-t border-border py-4 bg-background mt-auto", props.className)}
      {...rest}
    >
      <div className="flex flex-col gap-2">
        <Textarea
          value={value}
          onChange={onChange}
          className="border-muted-foreground/20 focus:border-blue-500 resize-none whitespace-pre-wrap break-words w-full p-2 max-h-[240px]"
          placeholder="Write a message..."
        />
        <Button
          onClick={onSend}
          className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-4 w-fit ml-auto"
        >
          {isSending ? null : <Send className="h-4 w-4 mr-2" />}
          {isSending ? <Loader className="animate-spin" /> : "Send"}
        </Button>
      </div>
    </div>
  );
};
