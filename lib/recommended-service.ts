import { getSelf } from "./auth-service";
import { db } from "./db";

export const getRecommended = async () => {
  try {
    let userId;

  try {
    const user = await getSelf();
    userId = user.id;
  } catch (error) {
    userId = null    
  }

  let recommendedUsers;

  if(userId){
    recommendedUsers = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId
            }
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId
                }
              }
            }
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId
                }
              }
            }
          }
        ]
      },
      include: {
        stream: {
          select: { isLive: true }
        }
      },
      orderBy: [
        {
          stream: {
            isLive: 'desc'
          }
        },
        {
          createdAt: 'desc'
        }
      ]
    });
  } else {
    recommendedUsers = await db.user.findMany({
      include: {
        stream: {
          select: { isLive: true }
        }
      },
      orderBy: [
        {
          stream: {
            isLive: 'desc'
          }
        },
        {
          createdAt: 'desc'
        }
      ]
    });
  }

  return recommendedUsers;
  } catch (error) {
    return [];
  }
}