import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from "@/pages/index";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock module secara sinkron tanpa async
vi.mock('@/services/env/client', () => ({
  env: {
    NEXT_PUBLIC_TMDB_API_KEY: "432d22aa2b19186fca95b930978acb76",
    NEXT_PUBLIC_TMDB_API_URL: "https://api.themoviedb.org/3/",
    NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzJkMjJhYTJiMTkxODZmY2E5NWI5MzA5NzhhY2I3NiIsIm5iZiI6MS42NDgzNjM5MTIzMjcwMDAxZSs5LCJzdWIiOiI2MjQwMDk4OGFlMjgxMTAwNWM0ZDhhZWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gGpAkxZjL_m8fdWoj0-KB-wzc53n5iWzxwioPQjNwiA",
    NEXT_PUBLIC_TMDB_IMAGE_URL: "https://image.tmdb.org/t/p/original",
  }
}));

// Mock the hooks and env module
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


describe("Page component", () => {
  it("renders correctly with mocked data", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );

    // Check for Popular Movies section title (empty list but title should be there)
    expect(screen.getByText("Popular Movies")).toBeInTheDocument();

    // Check for Upcoming Movies section title
    expect(screen.getByText("Upcoming Movies")).toBeInTheDocument();
  });
});