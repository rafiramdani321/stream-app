import { redirect } from "next/navigation";
import { Results } from "./_components/results";
import { Suspense } from "react";
import { ResultsSkeleton } from "../(home)/_components/results";

interface SearchPageProps {
  searchParams: {
    term?: string;
  }
};

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if(!searchParams.term){
    redirect("/");
  }
  
  return (
    <div className="h-full p-6 max-w-screen-2xl">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  )
}

export default SearchPage;