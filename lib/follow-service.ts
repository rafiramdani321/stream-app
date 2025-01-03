import { getSelf } from "./auth-service"
import { db } from "./db"
import { getUserById } from "./user-service";

export const getFollowers = async () => {
  try {
    const self = await getSelf();
    
    const followers = await db.follow.findMany({
      where: { 
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id
            }
          }
        }
      },
      include: {
        following: {
          include: {
            stream: { select: { isLive: true } }
          }
        }
      },
      orderBy: [
        {
          following: {
            stream: {
              isLive: "desc"
            }
          }
        },
        {
          createdAt: 'desc'
        }
      ]
    });
    
    return followers;
  } catch (error) {
    return [];
  }        
}

export const isFollowingUser = async (otherUserId: string) => {
  try {    
    const self = await getSelf();
  
    const otherUser = await db.user.findUnique({ where: { id: otherUserId } });
    if(!otherUser) throw new Error("User not found");

    if(self.id === otherUserId){
      return true;
    }
  
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUserId,
      }
    });
  
    return !!existingFollow;
  } catch (error) {
    return false;
  }
}

export const followUser = async (otherUserId: string) => {
  const self = await getSelf();
  
  const otherUser = await getUserById(otherUserId);
  if(!otherUser) throw new Error("User not found");
  
  if(self.id === otherUser.id) throw new Error("cannot follow yourself");
  
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id
    }
  });
  if(existingFollow) throw new Error("Already following");
  
  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id
    },
    include: {
      follower: true,
      following: true,
    }
  });
  
  return follow;
}

export const unfollowUser = async (otherUserId: string) => {
  const self = await getSelf();
  
  const otherUser = await getUserById(otherUserId);
  if(!otherUser) throw new Error("User not found");
  
  if(self.id === otherUser.id) throw new Error("Cannot unfollow yourself");
  
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id
    }
  });
  if(!existingFollow) throw new Error("not following");
  
  const unfollow = await db.follow.delete({
    where: { id: existingFollow.id },
    include: { following: true }
  })
  
  return unfollow;
}