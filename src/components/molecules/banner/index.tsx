"use client";

import Image from "next/image";
import { memo } from "react";
import { Clock, Star } from "lucide-react";

interface Movie {
  imgUrl: string;
  title: string;
  rating: string | number;
  releaseDate: string; // expects ISO format like "2024-01-15"
  duration: string;
  genre: string;
  description: string;
  poster?: string;
}

interface BannerProps {
  movie: Movie;
}

const MovieInfo = ({ movie }: { movie: Movie }) => (
  <section className="absolute bottom-0 left-0 p-8 md:p-16 w-full text-white">
    {/* Poster Image */}
    {movie.poster && (
      <div className="mb-5 w-1/6 h-full hidden lg:block">
        <Image
          src={movie.poster ?? movie.imgUrl}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg shadow-lg"
        />
      </div>
    )}
    <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
    <ul className="flex items-center space-x-8 mb-4 text-white list-none p-0 m-0">
      <li>
        {movie.releaseDate
          ? new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(movie.releaseDate))
          : "Unknown Date"}
      </li>
      <li className="flex items-center gap-2">
        <Clock size={20} /> {movie.duration}
      </li>
      <li>{movie.genre}</li>
      <li className="flex items-center gap-2 bg-orange-400 px-4 rounded-full py-2 font-medium text-white">
        <Star size={20} fill="#fff" /> {movie.rating} Rating
      </li>
    </ul>
    <p className="text-gray-200 mb-6 line-clamp-3">{movie.description}</p>
  </section>
);

const Banner = memo(({ movie }: BannerProps) => (
  <section className="relative h-screen min-h-[24rem] w-full">
    {/* Background Image */}
    <Image
      src={movie.imgUrl}
      alt={movie.title}
      layout="fill"
      objectFit="cover"
      priority
      className="absolute inset-0 mask-fade-bottom"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-background/100 via-background/60 to-transparent" />
    <MovieInfo movie={movie} />
  </section>
));

Banner.displayName = "Banner";
export default Banner;
