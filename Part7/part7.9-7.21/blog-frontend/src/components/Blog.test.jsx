import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: {
      name: "Minh Tran",
      username: "minht",
      id: "user123",
    },
    id: "blog123",
  };

  const mockLikeHandler = vi.fn();
  const mockDeleteHandler = vi.fn();

  it("renders title and author but not url or likes by default", () => {
    render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
      />,
    );

    expect(screen.getByText(/React patterns - Michael Chan/)).toBeDefined();

    expect(screen.queryByText("https://reactpatterns.com/")).toBeNull();
    expect(screen.queryByText(/7 likes/)).toBeNull();
  });

  it("shows blog details after clicking the view button", async () => {
    render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
      />,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("view"));

    expect(screen.getByText("https://reactpatterns.com/")).toBeInTheDocument();
    expect(screen.getByText(/7 likes/)).toBeInTheDocument();
    expect(screen.getByText(/added by Minh Tran/)).toBeInTheDocument();
  });
  it("shows url and likes after clicking the view button", async () => {
    render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
      />,
    );

    expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
    expect(screen.queryByText(`${blog.likes} likes`)).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByText("view"));

    expect(screen.getByText(blog.url)).toBeInTheDocument();
    expect(screen.getByText(`${blog.likes} likes`)).toBeInTheDocument();
  });

  it("calls the like handler twice when the like button is clicked twice", async () => {
    render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
      />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByText("view"));

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLikeHandler).toHaveBeenCalledTimes(2);
  });
});
