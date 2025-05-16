import { getDiscoverMovies, getMovieCast, getMovieDetail, getPopularMovies } from "@/core/http/api/movies";
import { MovieItem, MovieQuery } from "@/core/http/api/movies.types";
import { PaginationDto } from "@/core/http/response";
import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const queryKeys = createQueryKeyStore({
  movies: {
    getPopularMovies: (type: string, query?: MovieQuery) => ({
      queryKey: ["getPopularMovies", { ...query }, type],
      queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
        getPopularMovies(type, { ...query, page: pageParam }),
    }),
    getDiscover: (keyword) => ({
      queryKey: ["getDiscover", keyword],
      queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
        getDiscoverMovies({ page: pageParam, query: keyword }),
    }),
    getDetail : (id: number) => ({
      queryKey: ["getDetail", id],
      queryFn: () => getMovieDetail(id),
    }),
  },
  cast: {
    getMovieCast: (id: number) => ({
      queryKey: ["getMovieCast", id],
      queryFn: () => getMovieCast(id),
    }),
  }
});

export const useMovies = (type: string, query?: MovieQuery) => {
  return useInfiniteQuery({
    ...queryKeys.movies.getPopularMovies(type, query),
    getNextPageParam: (lastPage: PaginationDto<MovieItem[]>) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data.pages.flatMap((page) => page.results),
      };
    },
    initialPageParam: 1,
  });
};

export const useDiscoverMovies = (keyword: string) => {
  return useInfiniteQuery({
    ...queryKeys.movies.getDiscover(keyword),
    getNextPageParam: (lastPage: PaginationDto<MovieItem[]>) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data.pages.flatMap((page) => page.results),
      };
    },
    initialPageParam: 1,
  });
};

export const useMovieDetail = (id: number) => {
  return useQuery({
    ...queryKeys.movies.getDetail(id),
  });
};

export const useMovieCast = (id: number) => {
  return useQuery({
    ...queryKeys.cast.getMovieCast(id),
  });
};
