"use server";

import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { utapi } from "@/app/api/uploadthing/server/uploadthing";

export const removeThumnailUrl = async (value: string | null) => {
  try {
    const self = await getSelf();

    const selfStream = await db.stream.findUnique({ where: { userId: self.id } });
    if(!selfStream) throw new Error("Stream not found");

    if(!value) throw new Error("Something went wrong");
    
    const keyUrlImage = value.substring(value.lastIndexOf("/") + 1);

    const removeFile = await utapi.deleteFiles(keyUrlImage);

    if(!removeFile.success) throw new Error("Something went wrong");

    await db.stream.update({
      where: { id: selfStream.id },
      data: {
        thumbnailUrl: null
      }
    })

    revalidatePath(`/u/${self.username}`)
    revalidatePath(`/${self.username}`)

  } catch (error) {
    console.log(error)
  }
}

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();

    const selfStream = await db.stream.findUnique({ where: { userId: self.id } });
    if(!selfStream) throw new Error("Stream not found");

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: { id: selfStream.id },
      data: {
        ...validData
      }
    });

    revalidatePath(`/u/${self.username}/chat`)
    revalidatePath(`/u/${self.username}`)
    revalidatePath(`/${self.username}`)
    
    return stream;
  } catch (error: any) {
    throw new Error(error.message);
  }
}