import { useState, useEffect } from "react";
import User from "./components/User";
import SingleBlog from "./components/SingleBlog";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Menu from "./components/Menu";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './reducers/blogReducer';
import { setUser, clearUser } from './reducers/userReducer';
import { showNotification } from './reducers/notificationReducer';
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch();
  
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user.user);

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAllUsers().then(setUsers);
  }, []);


  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(showNotification(`Welcome back, ${user.name}`));
      setUsername('');
      setPassword('');
    } catch {
      dispatch(showNotification('Wrong username or password', 'error'));
    }
  };

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog(newBlog))
      .then((returnedBlog) => {
        dispatch(showNotification(`Blog "${returnedBlog.title}" by "${returnedBlog.author}" was added`));
        setNewBlog({ title: '', author: '', url: '' });
      })
      .catch((error) => {
        console.error('Add blog failed:', error);
        dispatch(showNotification('Error adding blog', 'error'));
      });
  };


  const handleLike = (id) => {
    if (!user) {
      dispatch(showNotification('You must be logged in to like a blog', 'error'));
      return;
    }
    const blog = blogs.find((b) => b.id === id);
    dispatch(likeBlog(blog)).then(() =>
      dispatch(showNotification(`You liked "${blog.title}"`))
    );
  };


  const handleDelete = (id) => {
    const blog = blogs.find((b) => b.id === id);
    if (window.confirm(`Delete blog "${blog.title}"?`)) {
      dispatch(deleteBlog(id)).then(() =>
        dispatch(showNotification('Blog deleted successfully'))
      );
    }
  };

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Router>
          <Notification message={notification.message} type={notification.type} />
          <Menu />
          {user === null ? (
            <Togglable buttonLabel="login">
              <LoginForm
                handleLogin={handleLogin}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
              />
            </Togglable>
          ) : (
            <div>
              <Togglable buttonLabel="Add new blog">
                <BlogForm
                  newBlog={newBlog}
                  handleBlogChange={handleBlogChange}
                  addBlog={addBlog}
                />
              </Togglable>
            </div>
          )}
          <Routes>
            <Route path="/" element={<BlogList blogs={blogs} handleDelete={handleDelete} handleLike={handleLike} user={user} />} />
            <Route
              path="/blogs/:id"
              element={<SingleBlog handleLike={handleLike} handleDelete={handleDelete} user={user} />}
            />
            <Route path="/users" element={<UserList users={users} />} />
            <Route path="/users/:id" element={<User users={users} />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;
