import { stringColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react"

interface ChatMessageProps {
  data: ReceivedChatMessage;
}

export const ChatMessage = ({data}: ChatMessageProps) => {
  const color = stringColor(data.from?.name || "");

  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color }}>
            {data.from?.name}
          </span>:
        </p>
        <p className="text-sm break-all">
          {data.message}
        </p>
      </div>
    </div>
  )
}