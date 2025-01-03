import { getSelf } from "./auth-service"
import { db } from "./db";
import { getUserById } from "./user-service";

export const isBlockingUser = async (otherUserId: string) => {
  try {    
    const self = await getSelf();
  
    const otherUser = await db.user.findUnique({ where: { id: otherUserId } });
    if(!otherUser) throw new Error("User not found");
  
    const existingBlock = await db.block.findFirst({
      where: {
        blockerId: otherUser.id,
        blockedId: self.id
      },
    });
  
    return !!existingBlock;
  } catch (error) {
    return false;
  }
}

export const blockUser = async (otherUserId: string) => {
  const self = await getSelf();

  if(self.id === otherUserId) throw new Error("cannot block yourself");

  const otherUser = await getUserById(otherUserId);
  if(!otherUser) throw new Error("User not found");

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id
      }
    }
  });

  if(existingBlock) throw new Error("Already blocked");

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id
    },
    include: {
      blocked: true
    }
  });

  return block;
}

export const unblockUser = async (id: string) => {
  const self = await getSelf();
  if(!self) throw new Error("Unauthorized");

  if(self.id === id) throw new Error("cannot unblock yourself");

  const otherUser = await db.user.findUnique({ where: { id } });
  if(!otherUser) throw new Error("User not found");

  const exisitingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      }
    }
  });

  if(!exisitingBlock) throw new Error("Not Blocked");

  const unBlock = await db.block.delete({
    where: { id: exisitingBlock.id },
    include: { blocked: true }
  })

  return unBlock;
}

export const getBlockedUsers = async () => {
  const self = await getSelf();

  if(!self) throw new Error("Unauthorized");

  const blockedUsers = await db.block.findMany({
    where: {
      blockerId: self.id
    },
    include: {
      blocked: true
    }
  });

  return blockedUsers;
}