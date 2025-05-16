import { memo, useMemo, useState } from "react";
// global styles
import Navbar from "@/components/molecules/navbar";
import Banner from "@/components/molecules/banner";
import { useMovieDetail, useMovies } from "@/services/hooks/apis/movies";
import MovieList from "@/components/molecules/movie-list";
import Footer from "@/components/molecules/footer";
import SearchDialog from "@/components/molecules/search-dialog";
import { env } from "@/services/env/client";

// Main page component
const Page = memo(() => {
  // handle use Trending Movies React Query
  const [open, setOpen] = useState(false);

  const popularMoviesQuery = useMovies("popular");
  const trendingMoviesQuery = useMovies("upcoming");
  const movieDetailQuery = useMovieDetail(977294);

  const bannerMovie = useMemo(
    () => ({
      title: movieDetailQuery.data?.title ?? "Loading...",
      description: movieDetailQuery.data?.overview ?? "Loading...",
      imgUrl:
        env.NEXT_PUBLIC_TMDB_IMAGE_URL + movieDetailQuery.data?.backdrop_path,
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
        movieDetailQuery.data?.genres.map((genre) => genre.name).join(", ") ??
        "Loading...",
    }),
    [movieDetailQuery.data?.backdrop_path, movieDetailQuery.data?.genres, movieDetailQuery.data?.overview, movieDetailQuery.data?.release_date, movieDetailQuery.data?.runtime, movieDetailQuery.data?.title, movieDetailQuery.data?.vote_average]
  );
  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar onClickSearch={() => setOpen(true)} />
      <Banner movie={bannerMovie} />

      <div className="container flex flex-col gap-y-20 w-full py-8">
        <MovieList
          title="Popular Movies"
          movies={popularMoviesQuery.data?.pages ?? []}
          isLoading={popularMoviesQuery.isLoading}
          isError={popularMoviesQuery.isError}
          error={popularMoviesQuery.error}
          fetchNextPage={popularMoviesQuery.fetchNextPage}
          hasNextPage={popularMoviesQuery.hasNextPage}
        />
        <MovieList
          title="Upcoming Movies"
          movies={trendingMoviesQuery.data?.pages ?? []}
          isLoading={trendingMoviesQuery.isLoading}
          isError={trendingMoviesQuery.isError}
          error={trendingMoviesQuery.error}
          fetchNextPage={trendingMoviesQuery.fetchNextPage}
          hasNextPage={trendingMoviesQuery.hasNextPage}
        />
      </div>
      <Footer />
      <SearchDialog open={open} setOpen={setOpen} />
    </div>
  );
});

Page.displayName = "IndexPage";
export default Page;
