import { useLocation, useNavigate, useParams, type Params } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useMessages } from "@/hooks/useMessages";
import { ChatLoading } from "./Chat.loading";
import { ChatActions } from "./ChatActions";
import { ChatMessagesList } from "./ChatMessagesList";
import { useSendMessage } from "@/hooks/useSendMessage";
import { queryClient } from "@/App";
import { useTextarea } from "@/hooks/useTextarea";
import { LayoutWithProfileWidget } from "@/shared/layouts/LayoutWithProfileWidget";

export const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selfProfleData = location.state.selfProfleData;

  const newMessage = useTextarea();

  const { entityUrn }: Readonly<Params<string>> = useParams();

  const { isLoading } = useMessages(entityUrn as string);

  const { mutate: sendMessage, isPending } = useSendMessage({
    entityUrn: entityUrn as string,
    hostIdentityUrn: selfProfleData.hostIdentityUrn,
    mutationOptions: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["messages", entityUrn] });
        newMessage.reset();
      },
    },
  });

  return (
    <LayoutWithProfileWidget className="w-[550px] grid grid-cols-2 gap-2 justify-between">
      <div className="flex flex-col relative">
        <Button onClick={() => navigate(-1)} variant="ghost" className="mb-3 w-fit">
          <ChevronLeft />
        </Button>
        {isLoading ? (
          <ChatLoading />
        ) : (
          <div className="flex-1 flex flex-col space-y-4 max-w-[300px]">
            <ChatMessagesList
              entityUrn={entityUrn as string}
            />
            <ChatActions
              value={newMessage.value}
              onChange={newMessage.onChange}
              onSend={() => sendMessage(newMessage.value)}
              isSending={isPending}
              className="mt-auto"
            />
          </div>
        )}
      </div>
    </LayoutWithProfileWidget>
  );
};
