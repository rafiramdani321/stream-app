import { ReceivedChatMessage } from "@livekit/components-react";
import { Skeleton } from "../ui/skeleton"
import { ChatMessage } from "./chat-message";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatList = ({
  isHidden, messages,
}: ChatListProps) => {
  if(isHidden || !messages || messages.length === 0){
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Welcome to the chat"}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 p-3 h-full overflow-y-auto flex-col-reverse">
      {messages.map(message => (
        <ChatMessage
          key={message.timestamp}
          data={message}
        />
      ))}
    </div>
  )
}

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  )
}