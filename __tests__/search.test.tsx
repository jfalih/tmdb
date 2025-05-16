import React from "react";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchPage from "@/pages/search";

// Mock next/navigation useSearchParams
vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "keyword" ? "batman" : null),
  }),
}));

// Mock your API hook
vi.mock("@/services/hooks/apis/movies", () => ({
  useDiscoverMovies: () => ({
    data: {
      pages: [
        [
          { id: 1, title: "Batman Begins" },
          { id: 2, title: "The Dark Knight" },
        ],
      ],
    },
    isLoading: false,
    isError: false,
    error: null,
    fetchNextPage: vi.fn(),
    hasNextPage: false,
  }),
}));

// Mock child components to simplify rendering
vi.mock("@/components/molecules/navbar", () => ({
  default: () => <div>Mock Navbar</div>,
}));

vi.mock("@/components/molecules/movie-wrapper", () => ({
  default: (props: {
    movies: Array<{ id: number; title: string }>;
    category: string;
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    fetchNextPage: () => void;
    hasNextPage: boolean;
  }) => (
    <div>
      Mock MovieWrapper with {props.movies.length} movies, category: {props.category}
    </div>
  ),
}));


describe("SearchPage", () => {
  it("renders correctly with keyword and movies", () => {
    render(<SearchPage />);

    // Cek title dan description berdasarkan keyword
    expect(screen.getByText('Results for "batman"')).toBeInTheDocument();
    expect(screen.getByText("Movies related to your search query.")).toBeInTheDocument();

    // Navbar mock harus muncul
    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();

    // MovieWrapper mock harus muncul dengan data movies dan kategori
    expect(screen.getByText("Mock MovieWrapper with 2 movies, category: batman")).toBeInTheDocument();
  });
});
