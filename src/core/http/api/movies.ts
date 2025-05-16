import {removeEmptyField} from '../../utils';
import {request} from '../request';
import {PaginationDto} from '../response';
import { apiUrl } from '../url';
import {MovieCastDetail, MovieDetail, MovieItem, MovieQuery, MovieSearchQuery} from './movies.types';

const MOVIE_URL = {
  POPULAR: 'movie',
  DISCOVER: 'discover/movie',
  SEARCH: 'search/movie',
  CAST: (id: number) => `movie/${id}/credits`,
};

export const getPopularMovies = (type: string, query?: MovieQuery) => {
  return request<PaginationDto<MovieItem[]>>(
    apiUrl(MOVIE_URL.POPULAR + '/' + type, removeEmptyField(query)),
    {
      method: 'get',
    },
  );
};

export const getMovieDetail = (id: number) => {
  return request<MovieDetail>(apiUrl(MOVIE_URL.POPULAR + '/' + id), {
    method: 'get',
  });
};

export const getDiscoverMovies = (query?: MovieSearchQuery) => {
  return request<PaginationDto<MovieItem[]>>(
    apiUrl(MOVIE_URL.SEARCH, removeEmptyField(query)),
    {
      method: 'get',
    },
  );
}

export const getMovieCast = (id: number) => {
  return request<MovieCastDetail>(apiUrl(MOVIE_URL.CAST(id)), {
    method: 'get',
  });
};