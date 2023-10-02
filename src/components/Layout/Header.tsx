"use client";
import { Container } from "@/components/ui/Container";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Bars } from "../ui/SVG/Bars";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { GoHomeFill, GoHome } from "react-icons/go";
import {
  BsPostcard,
  BsPeople,
  BsPeopleFill,
  BsPostcardFill,
} from "react-icons/bs";
import {
  BiGroup,
  BiMessageSquareDetail,
  BiSolidGroup,
  BiSolidMessageSquareDetail,
} from "react-icons/bi";
import { NotificationNav } from "../Notification/NotificationNav";
import { AvatarHoverCard } from "../ui/AvatarHoverCard";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Input } from "../ui/input";
import { useAuthStore } from "../../lib/storeZustand";
import { NavsPhone } from "./NavsPhone";
import { NavsComputer } from "./NavsComputer";
import { HeaderNavigation } from "../Header/Navigation";

import { UserAvatarLink } from "../Header/UserAvatarLink";
import dynamic from "next/dynamic";
import { UserAvatarHoverCard } from "../Header/UserAvatarHoverCard";
export const Header = () => {
  return (
    <header className="py-2 z-50 dark:bg-slate-800/80 bg-slate-100/80 backdrop-blur-lg sticky top-0">
      <Container>
        <div className="flex justify-between  w-full items-center">
          <main className="flex basis-2/4 gap-5 items-center">
            <Button variant={"link"} className="p-0 m-0">
              <Link href={"/"} className="font-bold text-2xl">
                Poddy
              </Link>
            </Button>
            <Input
              className="w-full"
              placeholder="Search in Poddy is fast and convenient"
            />
          </main>
          {/* For computers */}
          <nav className="hidden md:block">
            <HeaderNavigation />
          </nav>
          {/* The Div is the problem */}
          <div className="md:flex md:items-center md:gap-5 hidden ">
            <NotificationNav />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="p-0  text-slate-600 hover:bg-transparent  transition bg-tranparent ">
                  <UserAvatarHoverCard />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <NavsComputer />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* For Phone */}
          <div className="flex md:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-slate-200 text-slate-600 hover:bg-slate-300 transition border-slate-100 border-2">
                  <Bars />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <NavsPhone />
              </DropdownMenuContent>
            </DropdownMenu>
            <NotificationNav />
            <UserAvatarLink />
          </div>
        </div>
      </Container>
    </header>
  );
};
