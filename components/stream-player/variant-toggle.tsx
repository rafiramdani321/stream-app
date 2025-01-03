"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { Hint } from "../Hint";
import { Button } from "../ui/button";
import { MessageSquare, Users } from "lucide-react";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);  

  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? Users : MessageSquare;

  const onChange = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  }

  const label = isChat ? "Community" : "Live Chat";
  
  return (
    <Hint label={label} side="bottom" asChild>
      <Button
        variant="ghost"
        className="h-auto"
        onClick={onChange}
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  )
}