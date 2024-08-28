import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UpvoteList from "./UpvoteList";

const mockToggleUpvote = vi.fn();
vi.mock("@contexts/UpvoteContext", async () => {
  return {
    useUpvoteContext: () => ({
      addUpvote: vi.fn(),
      toggleUpvote: mockToggleUpvote,
    }),
  };
});

describe("UpvoteList", () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should toggle state when click on upvote button", () => {
    const mockId = "mockId";
    const mockData = [false, false];

    render(<UpvoteList listId={mockId} upvoteData={mockData} />);

    // Click one of the upvote button
    const upvoteButtons = screen.getAllByRole("button");
    fireEvent.click(upvoteButtons?.[0]);

    // Check toggleUpvote function is called once
    expect(mockToggleUpvote).toHaveBeenCalledTimes(1);
  });
});
