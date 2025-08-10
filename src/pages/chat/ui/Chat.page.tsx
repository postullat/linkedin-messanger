import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useMessages } from "@/hooks/useMessages";
import { ChatLoading } from "./Chat.loading";
import { ChatActions } from "./ChatActions";
import { ChatMessagesList } from "./ChatMessagesList";
import { useSendMessage } from "@/hooks/useSendMessage";

export const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { entityUrn } = useParams();
  const selfProfleData = location.state.selfProfleData;
  const { data: messages = [], isLoading } = useMessages(entityUrn as string);
  const { mutate: sendMessage, isPending } = useSendMessage(
    entityUrn as string,
    selfProfleData.hostIdentityUrn
  );

  return (
    <div className="flex flex-col h-full">
      <Button onClick={() => navigate(-1)} variant="ghost" className="mb-3 w-fit">
        <ChevronLeft />
      </Button>
      {isLoading ? (
        <ChatLoading />
      ) : (
        <div className="overflow-y-auto flex-1 flex flex-col space-y-4">
          <ChatMessagesList messages={[...messages].reverse()} />
          <ChatActions onSend={sendMessage} isSending={isPending} className="mt-auto"/>
        </div>
      )}
    </div>
  );
};
