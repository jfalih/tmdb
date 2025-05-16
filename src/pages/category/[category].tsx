"use client";

import MovieWrapper from "@/components/molecules/movie-wrapper";
import Navbar from "@/components/molecules/navbar";
import { useMovies } from "@/services/hooks/apis/movies";
import { useParams } from "next/navigation";
import { memo } from "react";

const categoryMeta: Record<string, { title: string; description: string }> = {
  popular: {
    title: "Popular Movies",
    description: "Check out the most popular movies right now.",
  },
  upcoming: {
    title: "Upcoming Movies",
    description: "Don't miss the upcoming movies soon to release.",
  },
  top_rated: {
    title: "Top Rated Movies",
    description: "The highest rated movies by viewers and critics.",
  },
  // add more categories here...
};

const CategoryPage = memo(() => {
    const params = useParams();
    const categoryParam = params?.category;
    const category = Array.isArray(categoryParam)
      ? categoryParam[0]
      : categoryParam ?? "popular";
    
  const { title, description } = categoryMeta[category] ?? {
    title: "Movies",
    description: "Browse movies by category.",
  };

  const moviesQuery = useMovies(category);

  // Flatten pages of movies to single array
  const movies = moviesQuery.data?.pages.flat() ?? [];

  return (
    <div className="bg-background text-white">
      <Navbar onClickSearch={function (): void {
        throw new Error("Function not implemented.");
      } } />
      <div className="container w-full h-full py-20">
        <h1 className="px-20 text-4xl font-bold">{title}</h1>
        <p className="px-20 text-gray-400 mb-5">{description}</p>

        <MovieWrapper
          movies={movies}
          category={category}
          isLoading={moviesQuery.isLoading}
          isError={moviesQuery.isError}
          error={moviesQuery.error}
          fetchNextPage={moviesQuery.fetchNextPage}
          hasNextPage={moviesQuery.hasNextPage}
        />
      </div>
    </div>
  );
});

CategoryPage.displayName = "CategoryPage";
export default CategoryPage;
