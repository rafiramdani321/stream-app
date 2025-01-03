"use server";

import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "@/lib/follow-service"

export const onFollow = async (otherUserId: string) => {
  try {    
    const followedUser = await followUser(otherUserId);
    
    revalidatePath("/");
    if(followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }
  
    return followedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const onUnFollow = async (otherUserId: string) => {
  try {
    const unFollow = await unfollowUser(otherUserId);

    revalidatePath("/");
    if(unFollow){
      revalidatePath(`/${unFollow.following.username}`);
    }

    return unFollow;
  } catch (error: any) {
    throw new Error(error.message);
  }
}