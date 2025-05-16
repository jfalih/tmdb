"use client";

import { useEffect, useState, useCallback } from "react";
import { MovieItem } from "@/core/http/api/movies.types";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardMovie from "../card-movie";
import { Swiper as SwiperType } from "swiper/types";

type MovieListProps = {
  title: string;
  movies: MovieItem[];
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
};

const MovieList = ({
  title,
  movies,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
}: MovieListProps) => {
  const [visibleMovies, setVisibleMovies] = useState<MovieItem[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // local loading state

  const loadMoreMovies = useCallback(() => {
    if (isLoadingMore) return; // prevent multiple loads simultaneously
    setIsLoadingMore(true);

    // Simulate loading delay, or replace with async fetch if needed
    setTimeout(() => {
      setVisibleMovies((prev) => {
        const nextChunk = movies.slice(prev.length, prev.length + 5);
        return [...prev, ...nextChunk];
      });
      setIsLoadingMore(false);
    }, 800); // 800ms delay for demo, adjust as needed
  }, [movies, isLoadingMore]);

  useEffect(() => {
    setVisibleMovies((prev) => {
      const prevIds = new Set(prev.map((m) => m.id));
      const newMovies = movies.filter((m) => !prevIds.has(m.id));
      return [...prev, ...newMovies];
    });
  }, [movies]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const currentIndex = swiper.activeIndex;
    const totalSlides = swiper.slides.length;

    if (currentIndex >= totalSlides - 7) {
      if (visibleMovies.length < movies.length) {
        console.log("Loading more movies locally...");
        loadMoreMovies();
      }

      if (hasNextPage && fetchNextPage) {
        console.log("Fetching next page...");
        fetchNextPage();
      }
    }
  }, [visibleMovies.length, movies.length, hasNextPage, fetchNextPage, loadMoreMovies]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading movies.</p>;

  return (
    <section className="w-screen">
      <h2 className="text-xl px-16 font-bold mb-4">{title}</h2>
      <Swiper
        slidesPerView={7}
        spaceBetween={20}
        slidesOffsetBefore={64}
        onSlideChange={handleSlideChange}
      >
        {visibleMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <CardMovie
              id={movie.id}
              date={movie.release_date}
              path={movie.poster_path}
              title={movie.title}
            />
          </SwiperSlide>
        ))}

        {/* Optional: Show loading slide */}
        {isLoadingMore && (
          <SwiperSlide>
            <div className="flex items-center justify-center bg-neutral-800 rounded-md h-48">
              <p className="text-white">Loading more...</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};

MovieList.displayName = "MovieList";
export default MovieList;
