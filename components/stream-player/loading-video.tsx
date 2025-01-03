import { Loader } from "lucide-react";
import Image from "next/image";

interface LoadingVideoProps {
  label: string;
  thumbnailUrl: string | null;
}

export const LoadingVideo = ({ label, thumbnailUrl }: LoadingVideoProps) => {
  return (
    <>
      {thumbnailUrl ? (
        <div className="aspect-video relative overflow-hidden">
          <Image
            alt="thumbnail"
            src={thumbnailUrl}
            fill
            className="object-cover"
          />
          <div className="flex flex-col justify-center items-center h-full space-y-4">
            <div className="absolute">
              <div className="flex flex-col items-center">
                <Loader className="h-10 w-10 animate-spin text-bluePrimary" />
                <p className="font-semibold capitalize">
                  {label}
                </p>
              </div>
            </div>
          </div>
        </div>      
      ) : (
      <div className="flex flex-col justify-center items-center h-full space-y-4">
        <Loader className="h-10 w-10 animate-spin text-bluePrimary" />
        <p className="font-semibold capitalize">
          {label}
        </p>
      </div>
      )}
    </>
  )
}