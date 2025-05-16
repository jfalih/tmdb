"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { MovieItem } from "@/core/http/api/movies.types";
import CardMovie from "../card-movie";
import MovieWrapperError from "./movie-wrapper-error";
import MovieWrapperLoading from "./movie-wrapper-loading";

type MovieListProps = {
  movies: MovieItem[];
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  category: string;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
};

const MovieWrapper = ({
  movies,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  category,
}: MovieListProps) => {
  const [visibleMovies, setVisibleMovies] = useState<MovieItem[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMoreMovies = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleMovies((prev) => {
        const nextChunk = movies.slice(prev.length, prev.length + 18);
        return [...prev, ...nextChunk];
      });
      setIsLoadingMore(false);
    }, 800);
  }, [movies, isLoadingMore]);

  // Reset visible movies or add new unique movies
  const prevCategoryRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevCategoryRef.current !== category) {
      // Category changed: reset visible movies to first chunk
      setVisibleMovies(movies.slice(0, 18));
      prevCategoryRef.current = category;
    } else {
      // Same category but movies updated (pagination): append new unique movies
      setVisibleMovies((prev) => {
        const prevIds = new Set(prev.map(m => m.id));
        const newMovies = movies.filter(m => !prevIds.has(m.id));
        return [...prev, ...newMovies];
      });
    }
  }, [movies, category]);
  // Scroll event handler for infinite scroll
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // Load more when user scrolls to 80% of the container height
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      if (visibleMovies.length < movies.length) {
        loadMoreMovies();
      }
      if (hasNextPage && fetchNextPage) {
        fetchNextPage();
      }
    }
  }, [visibleMovies.length, movies.length, hasNextPage, fetchNextPage, loadMoreMovies]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading) return <MovieWrapperLoading />;
  if (isError) return <MovieWrapperError />;

  return (
    <section className="w-screen px-20 max-h-screen h-full overflow-y-auto" ref={containerRef}>
      <div className="flex flex-wrap justify-between gap-5">
        {visibleMovies.map((movie) => (
          <div key={movie.id} className="w-[180px]">
            <CardMovie
              id={movie.id}
              date={movie.release_date}
              path={movie.poster_path}
              title={movie.title}
            />
          </div>
        ))}
        {isLoadingMore && (
          <div className="w-full flex justify-center py-4 text-white">
            Loading more...
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieWrapper;
