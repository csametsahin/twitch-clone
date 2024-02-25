"use client";

import { onBlock, onUnBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) =>
          toast.success(`You are now unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleFollowClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const handleBlockClick = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((data) =>
          toast.success(`You are now blocked ${data.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={handleFollowClick}
        disabled={isPending}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleBlockClick} disabled={isPending}>
        {"Block"}
      </Button>
    </>
  );
};
