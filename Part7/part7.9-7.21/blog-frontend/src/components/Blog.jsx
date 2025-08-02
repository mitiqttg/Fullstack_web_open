import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog, handleDelete, handleLike, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleVisibility = () => setShowDetails(!showDetails);

  const canDelete =
    blog.user && currentUser && blog.user.username === currentUser.username;

  return (
    <div style={blogContainerStyle}>
      <div style={summaryStyle}>
        <span>
          <Link to={`/blogs/${blog.id}`} style={titleLinkStyle}>
            {blog.title}
          </Link>{" "}
          - {blog.author}
        </span>
        <button onClick={toggleVisibility} style={toggleButtonStyle}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>

      {showDetails && (
        <div style={detailsStyle}>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes{" "}
            <button onClick={() => handleLike(blog.id)} style={actionButtonStyle}>
              like
            </button>
          </div>
          <div>added by {blog.user?.name || "unknown"}</div>
          {canDelete && (
            <button
              onClick={() => handleDelete(blog.id)}
              style={deleteButtonStyle}
            >
              delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const blogContainerStyle = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "1rem",
  marginBottom: "1rem",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  backgroundColor: "#fff",
};

const summaryStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleLinkStyle = {
  fontWeight: "bold",
  color: "#333",
  textDecoration: "none",
  transition: "color 0.2s, text-decoration 0.2s",
};

titleLinkStyle[':hover'] = {
  color: "#007bff",
  textDecoration: "underline",
};

const toggleButtonStyle = {
  padding: "6px 10px",
  fontSize: "14px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const detailsStyle = {
  marginTop: "0.8rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  fontSize: "14px",
};

const actionButtonStyle = {
  marginLeft: "0.5rem",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "4px 8px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "6px 10px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  width: "fit-content",
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

export default Blog;
