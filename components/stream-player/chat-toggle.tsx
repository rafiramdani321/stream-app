"use client";

import React from 'react'

import { Hint } from '../Hint'
import { Button } from '../ui/button'
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

const ChatToggle = () => {
  const {
    collapsed,
    onExpand,
    onCollapse,
  } = useChatSidebar((state) => state);

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if(collapsed){
      onExpand();
    }else{
      onCollapse();
    }
  };

  const label = collapsed ? "Expand Chat" : "Collapse Chat"

  return (
    <Hint label={label} side="bottom" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-textLightPrimary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  )
}

export default ChatToggle