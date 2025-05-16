import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from "@/pages/index";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock environment variables
vi.mock('@/services/env/client', () => ({
  env: {
    NEXT_PUBLIC_TMDB_API_KEY: "432d22aa2b19186fca95b930978acb76",
    NEXT_PUBLIC_TMDB_API_URL: "https://api.themoviedb.org/3/",
    NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN: "token",
    NEXT_PUBLIC_TMDB_IMAGE_URL: "https://image.tmdb.org/t/p/original",
  }
}));

// Mock hooks
vi.mock("@/services/hooks/apis/movies", () => ({
  useMovies: vi.fn(() => ({
    data: { pages: [] },
    isLoading: false,
    isError: false,
    error: null,
    fetchNextPage: vi.fn(),
    hasNextPage: false,
  })),
  useMovieDetail: vi.fn(() => ({
    data: {
      title: "Mock Movie",
      overview: "Mock overview",
      backdrop_path: "/mock-path.jpg",
      release_date: "2023-05-15",
      vote_average: 8,
      runtime: 120,
      genres: [{ name: "Action" }, { name: "Comedy" }],
    },
    isLoading: false,
    isError: false,
    error: null,
  })),
}));

// Optionally mock useRouter if your Page uses it
vi.mock("next/navigation", () => ({
  usePathname: () => '/mocked-path',
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
  }),
}));

describe("Page component", () => {
  it("renders correctly with mocked data", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );

    expect(screen.getByText("Popular Movies")).toBeInTheDocument();
    expect(screen.getByText("Upcoming Movies")).toBeInTheDocument();
  });
});
