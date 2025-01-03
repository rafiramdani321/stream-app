import { WifiOff } from "lucide-react";
import Image from "next/image";

interface OfflineVideoProps {
  username: string;
  thumbnailUrl: string | null;
}

export const OfflineVideo = ({ username, thumbnailUrl }: OfflineVideoProps) => {
  return (
    <>
      {thumbnailUrl ? (
        <div className="aspect-video relative overflow-hidden filter grayscale">
          <Image
            alt="thumbnail"
            src={thumbnailUrl}
            fill
            className="object-cover"
          />
          <div className="flex flex-col justify-center items-center h-full space-y-4">
            <div className="absolute">
              <div className="flex flex-col items-center">
                <WifiOff className="h-10 w-10" />
                <p className="tracking-tight">
                  {username} is offline
                </p>
              </div>
            </div>
          </div>
        </div>      
      ) : (
      <div className="flex flex-col justify-center items-center h-full space-y-4">
        <WifiOff className="h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground tracking-tight">
          {username} is offline
        </p>
      </div>
      )}
    </>
  )
}