"use client";

import NavItem, { NavItemSkeleton } from "./nav-item";
import { 
  TvMinimalPlay,
  KeyRound,
  MessageSquare,
  Users,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";;

export const Navigations = () => {
  const { user } = useUser();
  const pathName = usePathname();

  const navLinks = [
    {
      title: "Stream",
      href: `/u/${user?.username}`,
      icon: TvMinimalPlay
    },
    {
      title: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound
    },
    {
      title: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare
    },
    {
      title: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users
    }
  ];
  
  return (
    <>
      <ul className="space-y-2 px-2 pt-4 lg:pt-0">
        {navLinks.map(item => (
          <NavItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
            isActive={pathName === item.href}
          />
        ))}
      </ul>
    </>
  )
}

export const NavigationsSkeleton = () => {
  return (
    <ul className="space-y-2 pt-4">
      {[...Array(4)].map((_, i) => (
        <NavItemSkeleton key={i} />
      ))}
    </ul>
  )
}