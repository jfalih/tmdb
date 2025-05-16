"use client";
import Banner from "@/components/molecules/banner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { env } from "@/services/env/client";
import { useMovieCast, useMovieDetail } from "@/services/hooks/apis/movies";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import React, { memo } from "react";

const MoviePage = memo(() => {
  const params = useParams(); // returns { id: '123' } if route is /movies/123
  const movieId = params?.id;

  const movieDetailQuery = useMovieDetail(Number(movieId));
  const castQuery = useMovieCast(Number(movieId));
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Back Button Here */}
      <div className="absolute top-10 z-100 left-10 p-4">
        <Button onClick={() => window.history.back()} variant="ghost" rounded="full" size="lg">
          <ArrowLeft className="h-6 w-6" />
          Back To Movies
        </Button>
      </div>
      <Banner
        movie={{
          poster:
            env.NEXT_PUBLIC_TMDB_IMAGE_URL + movieDetailQuery.data?.poster_path,
          title: movieDetailQuery.data?.title ?? "Loading...",
          description: movieDetailQuery.data?.overview ?? "Loading...",
          imgUrl:
            env.NEXT_PUBLIC_TMDB_IMAGE_URL +
            movieDetailQuery.data?.backdrop_path,
          releaseDate: movieDetailQuery.data?.release_date ?? "2023-10-01",
          rating: movieDetailQuery.data?.vote_average
            ? (movieDetailQuery.data?.vote_average / 2).toFixed(1)
            : "Loading...",
          duration: movieDetailQuery.data?.runtime
            ? `${Math.floor(movieDetailQuery.data?.runtime / 60)}h ${
                movieDetailQuery.data?.runtime % 60
              }m`
            : "Loading...",
          genre:
            movieDetailQuery.data?.genres
              .map((genre) => genre.name)
              .join(", ") ?? "Loading...",
        }}
      />
      {/* Main cast here */}
      <div className="container w-screen py-8">
        <h1 className="px-20 text-4xl font-bold">Main Cast</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-screen gap-6 justify-center px-20 mt-6">
          {castQuery.data?.cast?.map((val) => (
            <div key={val.id} className="flex items-center gap-x-4">
              <Avatar className="w-16 h-16 rounded-full object-cover">
                <AvatarImage
                  src={
                    val.profile_path
                      ? env.NEXT_PUBLIC_TMDB_IMAGE_URL + val.profile_path
                      : "https://picsum.photos/200/300"
                  }
                  alt={val.name}
                  className="object-cover rounded-full"
                  width={64}
                  height={64}
                />
                <AvatarFallback>
                  {val.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{val.name}</h2>
                <p className="text-gray-400 text-sm">as {val.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

MoviePage.displayName = "MoviePage";
export default MoviePage;
