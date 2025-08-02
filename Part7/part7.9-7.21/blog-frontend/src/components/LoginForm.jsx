import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <form onSubmit={handleLogin} style={formStyle}>
      <div style={inputGroupStyle}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Enter username"
          style={inputStyle}
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Enter password"
          style={inputStyle}
        />
      </div>
      <button type="submit" style={submitStyle}>
        Login
      </button>
    </form>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  borderRadius: "15px",
  maxWidth: "400px",
  margin: "2rem auto",
  padding: "1rem",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const inputStyle = {
  width: "95%",
  padding: "8px",
  borderRadius: "15px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const submitStyle = {
  padding: "10px",
  backgroundColor: "#28a745",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
