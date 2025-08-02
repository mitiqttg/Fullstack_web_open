import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updated = action.payload;
      return state.map((b) => (b.id === updated.id ? updated : b));
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
    appendComment(state, action) {
      const { blogId, comment } = action.payload;
      return state.map((blog) =>
        blog.id === blogId
          ? { ...blog, comments: [...(blog.comments || []), comment] }
          : blog
      );
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog, appendComment } = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blog) => async (dispatch) => {
  const newBlog = await blogService.create(blog);
  dispatch(appendBlog(newBlog));
  return newBlog;
};

export const likeBlog = (blog) => async (dispatch) => {
  const updated = await blogService.update(blog.id, {
    ...blog,
    likes: blog.likes + 1,
  });
  dispatch(updateBlog(updated));
};

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.remove(id);
  dispatch(removeBlog(id));
};

export const addComment = (blogId, commentText) => {
  return async (dispatch) => {
    const response = await blogService.postComment(blogId, commentText);
    dispatch(appendComment({ blogId, comment: response }));
  };
};

export default blogSlice.reducer;
