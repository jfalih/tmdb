import { cn } from "@/lib/utils";
import { env } from "@/services/env/client";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface CardMovieProps {
  path: string;
  title: string;
  date: string;
  id: number;
}

const CardMovie = memo((props: CardMovieProps) => {
  const { path, title, date, id } = props;
  return (
    <Link href={`/movie/${id}`} className="w-full">
      <div
        className={cn("bg-neutral-800 rounded-md overflow-hidden relative")}
        style={{ aspectRatio: "9 / 16" }}
      >
        <Image
          src={env.NEXT_PUBLIC_TMDB_IMAGE_URL + path}
          alt={title}
          fill
          style={{
            objectFit: "cover",
          }}
        />
        <div className="absolute h-20 justify-end flex flex-col w-full bottom-0 p-2 rounded text-white bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-muted">{date}</p>
        </div>
      </div>
    </Link>
  );
});

CardMovie.displayName = "CardMovie";
export default CardMovie;
