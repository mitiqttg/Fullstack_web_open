import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../reducers/userReducer';
import { showNotification } from '../reducers/notificationReducer';

const Menu = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    dispatch(clearUser());
    dispatch(showNotification('Logged out successfully'));
  };

  return (
    <div style={menuContainerStyle}>
      <Link to="/" style={navLinkStyle}>Blogs</Link>
      <Link to="/users" style={navLinkStyle}>Users</Link>
      {user && (
        <>
          <span style={loginTextStyle}>{user.name} logged in</span>
          <button onClick={handleLogout} style={logoutButtonStyle}>logout</button>
        </>
      )}
    </div>
  );
};

// Inline styles
const menuContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.5rem',
  background: '#f0f0f0',
  padding: '1rem',
  marginBottom: '1rem',
  fontWeight: 'bold',
  borderBottom: '1px solid #ccc',
};

const navLinkStyle = {
  textDecoration: 'none',
  color: '#333',
  padding: '0.5rem 1rem',
  borderRadius: '10px',
  transition: 'all 0.2s ease-in-out',
};

const loginTextStyle = {
  fontWeight: 'normal',
  color: '#666',
  fontSize: '14px',
};

const logoutButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const addHoverStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    a:hover {
      background-color: #e0e0e0;
      color: #000;
    }
  `;
  document.head.appendChild(style);
};
addHoverStyles();

export default Menu;
