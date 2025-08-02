import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { useState } from "react";

describe("Tests for BlogForm components", () => {
  it("calls addBlog with filling the form", async () => {
    const mockAddBlog = vi.fn();
    const Wrapper = () => {
      const [newBlog, setNewBlog] = useState({
        title: "",
        author: "",
        url: "",
      });

      const handleBlogChange = (e) => {
        const { name, value } = e.target;
        setNewBlog({ ...newBlog, [name]: value });
      };

      return (
        <BlogForm
          newBlog={newBlog}
          handleBlogChange={handleBlogChange}
          addBlog={(e) => {
            e.preventDefault();
            mockAddBlog({ ...newBlog });
          }}
        />
      );
    };

    render(<Wrapper />);

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText("write title here"),
      "A test title",
    );
    await user.type(
      screen.getByPlaceholderText("write author here"),
      "Test blog author",
    );
    await user.type(
      screen.getByPlaceholderText("write url here"),
      "http://example.com",
    );
    await user.click(screen.getByText("save"));

    expect(mockAddBlog).toHaveBeenCalledTimes(1);
    expect(mockAddBlog).toHaveBeenCalledWith({
      title: "A test title",
      author: "Test blog author",
      url: "http://example.com",
    });
  });
});
