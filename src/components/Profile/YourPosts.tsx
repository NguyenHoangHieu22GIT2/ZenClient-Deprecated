"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Posts } from "../Posts/Posts";
import { CreatePost } from "../Posts/CreatePost";

export const YourPosts = (props: {}) => {
  return (
    <div>
      <Card className="p-3 flex justify-stretch [&>*]:basis-1/3 gap-3">
        <Button variant={"secondary"}>Posts</Button>
        <Button variant={"secondary"}>Friends</Button>
        <Button variant={"secondary"}>Information</Button>
      </Card>
      <Separator className="my-5" />
      <CreatePost />
      <Separator className="my-5" />
      <Posts />
    </div>
  );
};