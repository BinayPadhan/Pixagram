"use client";

import React, { useState } from 'react'
import { Button } from './ui/button';
import { toggleFollow } from '@/action/user.action';
import toast from 'react-hot-toast';
import { Loader2Icon } from 'lucide-react';

function FollowButton({userId} : {userId: string}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleFollow = async () => {
        setIsLoading(true);
        
        try {
            await toggleFollow(userId);
            toast.success("Followed successfully");
        } catch (error) {
            console.log("Error following user", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
        

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Follow"}
    </Button>
  )
}

export default FollowButton