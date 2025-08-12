import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import classNames from "classnames";
import { Loader, Send } from "lucide-react";
import { type ChangeEvent, type ComponentProps } from "react";

interface ChatActionsProps extends ComponentProps<"div"> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Input
            value={value}
            onChange={onChange}
            className="pr-12 border-muted-foreground/20 focus:border-blue-500"
          />
        </div>
        <Button
          onClick={onSend}
          className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-4 w-[80px]"
        >
          {isSending ? null : <Send className="h-4 w-4 mr-2" />}
          {isSending ? <Loader className="animate-spin" /> : "Send"}
        </Button>
      </div>
    </div>
  );
};
