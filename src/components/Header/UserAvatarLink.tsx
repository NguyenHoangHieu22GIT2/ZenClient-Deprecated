"use client";
import Link from "next/link";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { cookies } from "next/headers";
import { useUserFromZustandClient } from "@/hooks/useUserFromZustandClient";
import { useUserStore } from "@/lib/useUserStore";
import { ztUser, ztUserMinimalData } from "@/Types/User";

type props = {
  user: ztUserMinimalData;
};

export function UserAvatarLink(props: props) {
  return (
    <Link
      href={
        props.user && props.user._id ? `/users/${props.user._id}` : "/login"
      }
    >
      <AvatarHoverCard
        username="User"
        avatarUrl={
          props.user && props.user.avatar
            ? props.user.avatar
            : "/default-user.jpeg"
        }
        // avatarUrl="https://github.com/shadcn.png"
        yearOfJoined={0}
      />
    </Link>
  );
}
