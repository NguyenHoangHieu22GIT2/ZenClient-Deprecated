import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarHoverCard } from "@/components/ui/AvatarHoverCard";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Heading";
import { Paragraph } from "@/components/ui/Paragraph";
import { Username } from "@/components/ui/Username";
import { CommentId, CommentType, PostId, ReplyType } from "@/Types/Post";
import React, { useCallback, useState } from "react";
import { BiDownArrowAlt } from "react-icons/bi";
import { PostComment } from "./PostComment";
import { Replies } from "./Replies";
import { api } from "@/lib/axios.api";
import { useAuthStore } from "@/lib/storeZustand";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Bearer } from "@/utils/Bearer";
import { v4 } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

type props = {
  postId: PostId;
  comment: CommentType;
  changeComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};
export const Comment = (props: props) => {
  const access_token = useAuthStore((state) => state.access_token);
  const [replies, setReplies] = useState(props.comment.replies || []);

  const {
    mutate: deleteCommentMutation,
    isLoading: deleteCommentIsLoading,
    error: deleteCommentError,
  } = useMutation({
    mutationKey: ["post/comment/delete"],
    mutationFn: async ({
      postId,
      commentId,
      replyId,
    }: {
      postId: PostId;
      commentId: CommentId;
      replyId?: CommentId;
    }) => {
      return api
        .delete(
          `/posts/delete-comment?postId=${postId}&commentId=${commentId}${
            replyId ? `&replyId=${replyId}` : ""
          }`,
          { headers: { Authorization: Bearer(access_token) } }
        )
        .then((data) => {
          const deletedComment: CommentType = data.data;
          console.log(deletedComment);
          if (replyId) {
            setReplies((oldReplies) => {
              return oldReplies.filter((reply) => {
                return reply._id !== deletedComment._id;
              });
            });
          } else {
            props.changeComments((oldComments) => {
              return oldComments.filter(
                (comment) => comment._id !== deletedComment._id
              );
            });
          }
          return deletedComment;
        });
    },
  });
  const deleteCommentHandler = useCallback(
    (replyId?: CommentId) => {
      deleteCommentMutation({
        postId: props.postId,
        commentId: props.comment._id,
        replyId,
      });
    },
    [deleteCommentMutation, props.postId]
  );

  const [openPostComment, setOpenPostComment] = useState(false);
  const createReply = useCallback(
    (reply: ReplyType) => {
      setReplies((oldArray) => [...oldArray, reply]);
    },
    [replies]
  );
  const [loadMoreReplies, setLoadMoreReplies] = useState("");
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["post/comments/replies", loadMoreReplies],
    queryFn: async () => {
      return api
        .get(
          `posts/get-replies?postId=${props.postId}&commentId=${props.comment._id}`,
          {
            headers: {
              Authorization: Bearer(access_token),
            },
          }
        )
        .then((data) => {
          setReplies(data.data);
          return data;
        });
    },
    enabled: !!loadMoreReplies,
  });
  console.log(data, isLoading);
  function getMoreReplies() {
    refetch();
    const random = v4();
    setLoadMoreReplies(random);
  }

  return (
    <div>
      <div className="border rounded-lg shadow-sm p-2 dark:bg-slate-800 bg-slate-100">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center ">
            <AvatarHoverCard
              username={props.comment.user.username}
              avatarUrl={props.comment.user.avatar || "./default-user.jpeg"}
              yearOfJoined={4}
            />
            <Username>{props.comment.user.username}</Username>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteCommentHandler()}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem>See old Edits</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="font-normal leading-7">{props.comment.comment}</p>
        <div className="text-right">
          <Button
            onClick={() => setOpenPostComment((oldBool) => !oldBool)}
            variant={"outline"}
            className="px-2 py-1 "
          >
            <BiDownArrowAlt />
            Replies
          </Button>
        </div>
        <div className="my-2">
          {openPostComment && (
            <>
              <PostComment
                onAddComment={createReply}
                postId={props.postId}
                commentId={props.comment._id}
              />
            </>
          )}
        </div>
        <Replies
          onDeleteReply={deleteCommentHandler}
          refetchReplies={getMoreReplies}
          repliesCount={props.comment.repliesCount}
          replies={replies}
        />
      </div>
    </div>
  );
};
