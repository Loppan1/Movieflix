import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import Search from "../SearchBar/SearchBar";
import { MemoryRouter } from "react-router-dom";

// Define mock movie data
const mockMovies = [
  {
    title: "Inception",
    year: 2010,
    rating: "PG-13",
    actors: ["Leonardo DiCaprio"],
    genre: "Sci-Fi",
    synopsis:
      "A thief who steals corporate secrets through the use of dream-sharing technology...",
    thumbnail: "/assets/inception.jpg",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    rating: "PG-13",
    actors: ["Christian Bale"],
    genre: "Action",
    synopsis:
      "When the menace known as the Joker emerges from his mysterious past...",
    thumbnail: "/assets/dark-knight.jpg",
  },
];

// Mock Fuse.js for handle fuzzy search
vi.mock("fuse.js", () => ({
  default: vi.fn().mockImplementation(() => ({
    search: vi.fn((value) => {
      return mockMovies
        .filter((movie) =>
          movie.title.toLowerCase().includes(value.toLowerCase())
        )
        .map((movie) => ({ item: movie }));
    }),
  })),
}));

//mock navigate
const navigateMock = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    useNavigate: () => navigateMock, // Mock `useNavigate`
  };
});

describe("Search component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
  });

  test("Search Input updates on change", () => {
    const searchInput = screen.getByPlaceholderText(
      "Search...."
    ) as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
    //simulate typing
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });

  test("Suggestions are shown with onchange", () => {
    const searchInput = screen.getByPlaceholderText(
      "Search...."
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "inception" } });
    const movieSuggestion = screen.getByText("Inception");
    expect(movieSuggestion).toBeInTheDocument();
  });

  test("displays 'No movies found' when no matches are found", () => {
    const inputElement = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(inputElement, { target: { value: "non-existent-movie" } });
    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });

  test("navigates to the movie view when a suggestion is clicked", () => {
    const inputElement = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(inputElement, { target: { value: "inception" } });
    const movieSuggestion = screen.getByText("Inception");
    // Simulate clicking on the movie suggestion
    fireEvent.click(movieSuggestion);
    expect(navigateMock).toHaveBeenCalledWith("/movieview/Inception");
  });
});
