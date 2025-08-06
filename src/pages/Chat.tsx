import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useMessages } from "@/hooks/useMessages";
import { Card } from "@/components/ui/Card";

export const Chat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { messages, isLoading } = useMessages(id as string);
  const messagesForRender = [...messages].reverse();
  return (
    <div>
      <div>
        <Button onClick={() => navigate(-1)} variant="ghost" className="mb-3">
          <ChevronLeft />
        </Button>
        {isLoading ? (
          <RefreshCcw />
        ) : (
          messagesForRender.map((message) => {
            const text = message.body.text;
            return (
              <Card className="mb-1 p-2">
                <span>{text}</span>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
