import { Link } from 'react-router-dom'

export default function Navigation({ user, onLogout }) {
  return (
    <nav style={{
      background: '#f4f4f4',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      alignItems: 'center',
      borderBottom: '1px solid #ccc'
    }}>
      <Link to="/authors">Authors</Link>
      <Link to="/books">Books</Link>
      {user && <Link to="/add">Add Book</Link>}
      {user && <Link to="/recommend">Recommend</Link>}
      {!user && <Link to="login">Login</Link>}
      {user && (
        <>
          <span style={{ marginLeft: '20px' }}>
            Logged in as <strong>{user.username}</strong>
          </span>
          <button onClick={onLogout} style={{
            marginLeft: '10px',
            padding: '5px 10px',
            cursor: 'pointer'
          }}>
            Logout
          </button>
        </>
      )}
    </nav>
  )
}
