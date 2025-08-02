import { useParams } from 'react-router-dom';

const User = ({ users }) => {
  const { id } = useParams();
  const user = users.find((u) => u.id === id);

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
