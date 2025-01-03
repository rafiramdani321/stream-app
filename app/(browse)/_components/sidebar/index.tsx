import Wrapper from "./wrapper"
import { Toggle, ToggleSkeleton } from "./toggle"
import { getFollowers } from "@/lib/follow-service"
import { getRecommended } from "@/lib/recommended-service"
import { Following, FollowingSkeleton } from "./following"
import { Recommended, RecommendedSkeleton } from "./recommended"

export const Sidebar = async () => {
  const following = await getFollowers();
  const recommended = await getRecommended();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-2 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  )
}

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full border-r">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}