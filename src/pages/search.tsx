"use client";

import { memo, useState } from "react";
import { useSearchParams } from "next/navigation";

import MovieWrapper from "@/components/molecules/movie-wrapper";
import Navbar from "@/components/molecules/navbar";
import { useDiscoverMovies } from "@/services/hooks/apis/movies";
import SearchDialog from "@/components/molecules/search-dialog";

const SearchPage = memo(() => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const { title, description } = {
    title: keyword ? `Results for "${keyword}"` : "Search",
    description: keyword
      ? "Movies related to your search query."
      : "Type a keyword to find movies.",
  };

  const moviesQuery = useDiscoverMovies(keyword);

  const movies = moviesQuery.data?.pages.flat() ?? [];

  return (
    <div className="bg-background text-white">
      <Navbar
        onClickSearch={() => setOpen(true)}
      />
      <div className="container w-full h-full py-20">
        <h1 className="px-20 text-4xl font-bold">{title}</h1>
        <p className="px-20 text-gray-400 mb-5">{description}</p>

        <MovieWrapper
          movies={movies}
          category={keyword}
          isLoading={moviesQuery.isLoading}
          isError={moviesQuery.isError}
          error={moviesQuery.error}
          fetchNextPage={moviesQuery.fetchNextPage}
          hasNextPage={moviesQuery.hasNextPage}
        />
      </div>
      <SearchDialog open={open} setOpen={setOpen} />
    </div>
  );
});

SearchPage.displayName = "SearchPage";
export default SearchPage;
