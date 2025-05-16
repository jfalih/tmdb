import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MoviePage from "@/pages/movie/[id]";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock environment variables
vi.mock('@/services/env/client', () => ({
  env: {
    NEXT_PUBLIC_TMDB_API_KEY: "mock-key",
    NEXT_PUBLIC_TMDB_API_URL: "https://api.themoviedb.org/3/",
    NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN: "token",
    NEXT_PUBLIC_TMDB_IMAGE_URL: "https://image.tmdb.org/t/p/original",
  }
}));

// Mock hooks with test data
vi.mock("@/services/hooks/apis/movies", () => ({
  useMovieDetail: vi.fn(() => ({
    data: {
      title: "Mock Movie",
      overview: "Mock overview",
      poster_path: "/mock-poster.jpg",
      backdrop_path: "/mock-backdrop.jpg",
      release_date: "2023-05-15",
      vote_average: 8,
      runtime: 120,
      genres: [{ name: "Action" }, { name: "Comedy" }],
    },
    isLoading: false,
    isError: false,
    error: null,
  })),
  useMovieCast: vi.fn(() => ({
    data: {
      cast: [
        {
          id: 1,
          name: "Actor One",
          character: "Hero",
          profile_path: "/actor1.jpg",
        },
        {
          id: 2,
          name: "Actor Two",
          character: "Villain",
          profile_path: null,
        },
      ],
    },
    isLoading: false,
    isError: false,
    error: null,
  })),
}));

// Mock next/navigation hooks
vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "123" }),
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    pathname: "/movie/123",
    route: "/movie/[id]",
  }),
}));

describe("MoviePage component", () => {
  it("renders movie details and cast correctly", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MoviePage />
      </QueryClientProvider>
    );

    // Movie details
    expect(screen.getByText("Mock Movie")).toBeInTheDocument();
    expect(screen.getByText("Mock overview")).toBeInTheDocument();

    // Cast members
    expect(screen.getByText("Actor One")).toBeInTheDocument();
    expect(screen.getByText("as Hero")).toBeInTheDocument();
    expect(screen.getByText("Actor Two")).toBeInTheDocument();
    expect(screen.getByText("as Villain")).toBeInTheDocument();
  });
});
