"use client";

import React, { startTransition, useOptimistic, useState } from "react";
import { toggleLike } from "../actions/toggleLike";
import { ObjectId } from "mongodb";

interface LikeButtonProps {
  postId: ObjectId;
  initialIsLiked?: boolean;
}

export default function LikeButton({
  postId,
  initialIsLiked = false,
}: LikeButtonProps): React.ReactNode {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [optimisticIsLiked, setOptimisticIsLiked] =
    useOptimistic<boolean>(isLiked);

  const handleLike = () => {
    startTransition(async () => {
      const newValue = !optimisticIsLiked;
      setOptimisticIsLiked(newValue);

      const updatedValue = await toggleLike(postId, optimisticIsLiked);
      startTransition(() => {
        setIsLiked(updatedValue);
      });
    });
  };

  return (
    <div>
      <button onClick={handleLike}>
        {optimisticIsLiked ? "❤️ Unlike" : "🤍 Like"}
      </button>
    </div>
  );
}
