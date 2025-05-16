import React from "react";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryPage from "@/pages/category/[category]";

// Mock next/navigation useParams
vi.mock("next/navigation", () => ({
  useParams: () => ({
    category: "top_rated",
  }),
}));

// Mock your API hook useMovies
vi.mock("@/services/hooks/apis/movies", () => ({
  useMovies: () => ({
    data: {
      pages: [
        [
          { id: 10, title: "Top Movie 1" },
          { id: 11, title: "Top Movie 2" },
        ],
      ],
    },
    isLoading: false,
    isError: false,
    error: null,
    fetchNextPage: vi.fn(),
    hasNextPage: true,
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


describe("CategoryPage", () => {
  it("renders category title, description, and movies correctly", () => {
    render(<CategoryPage />);

    // Cek apakah title dan description sesuai dengan category 'top_rated'
    expect(screen.getByText("Top Rated Movies")).toBeInTheDocument();
    expect(screen.getByText("The highest rated movies by viewers and critics.")).toBeInTheDocument();

    // Navbar mock muncul
    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();

    // MovieWrapper mock muncul dengan data dan kategori yang sesuai
    expect(screen.getByText("Mock MovieWrapper with 2 movies, category: top_rated")).toBeInTheDocument();
  });
});
