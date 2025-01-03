"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { SearchIcon, X } from 'lucide-react';
import qs from "query-string";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!value) return;

    const url = qs.stringifyUrl({
      url: "/search",
      query: { term: value },
    }, { skipEmptyString: true });

    router.push(url)
  }
  
  return (
    <form onSubmit={onSubmit} className='relative flex items-center w-full lg:w-[400px]'>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='focus-visible:right-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-r-none text-sm font-normal'
        placeholder='Search'
      />
      {value && (
        <X
          className='absolute right-[3.3rem] h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition'
          onClick={() => setValue("")}
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="blueSecondary"
        className='rounded-l-none'
      >
        <SearchIcon className='w-5 h-5' />
      </Button>
    </form>
  )
}

export default Search