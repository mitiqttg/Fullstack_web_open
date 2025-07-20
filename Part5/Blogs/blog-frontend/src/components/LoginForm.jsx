import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      Username
      <input
        type="text"
        value={username}
        name="Username"
        id="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      Password
      <input
        type="password"
        value={password}
        name="Password"
        id="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm
