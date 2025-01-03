import { getSearch } from "@/lib/search-service"
import { ResultCard } from "../../(home)/_components/result-card";

interface ResultsProps{
  term?: string;
}

export const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term);
  
  return (
    <div>
      <div className="text-lg font-semibold mb-4">
        Results for term &quot;{term}&quot;
      </div>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">
          No Results found. Try searching for something else
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((result) => (
          <ResultCard 
            key={result.id}
            data={result}
          />
        ))}
      </div>
    </div>
  )
}