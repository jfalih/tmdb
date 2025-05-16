export type PaginationDto<T> = {
  page: number;
  total_results: number;
  total_pages: number;
  results: T;
};

export type ResponseError = {
  statusCode: number;
  message: string;
  error: string;
};
