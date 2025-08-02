import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
  return (
    <div className="user-list-container" style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Users</h2>
      <table style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        borderCollapse: 'collapse',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} style={{
              backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
              transition: 'background 0.3s',
              cursor: 'pointer'
            }}>
              <td style={tdStyle}>
                <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: '#0077cc' }}>
                  {user.username}
                </Link>
              </td>
              <td style={tdStyle}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: '12px 16px',
  borderBottom: '2px solid #ccc',
  textAlign: 'left',
  fontWeight: 'bold'
};

const tdStyle = {
  padding: '12px 16px',
  borderBottom: '1px solid #e0e0e0'
};

export default UserList;
