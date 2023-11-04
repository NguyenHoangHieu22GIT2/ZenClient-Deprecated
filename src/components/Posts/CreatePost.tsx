import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FormCreatePost } from "./FormCreatePost";
import { ztPost } from "@/Types/Post";

type props = {
  onCreatePost?: (post: ztPost) => void;
};

export const CreatePost = (props: props) => {
  return (
    <Card className="m-2 mx-auto w-full lg:max-w-[800px]">
      <CardHeader>
        <CardTitle>Express Yourself</CardTitle>
        <CardDescription>Show yourself to the world!</CardDescription>
      </CardHeader>
      <CardContent>
        <FormCreatePost />
      </CardContent>
    </Card>
  );
};
