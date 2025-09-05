import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommendations'
import Navigation from './components/Navigation'
import Notify from './components/Notify'

import { ME } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)

  const { data: meData } = useQuery(ME, {
    skip: !token
  })
  const user = meData?.me || null
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 2000)
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('user-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('user-token')
    client.resetStore()
    navigate('/')
  }

  return (
    <div>
      <Navigation user={user} onLogout={logout} />
      <div style={{ padding: '20px' }}>
        <Notify errorMessage={errorMessage} />
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/authors" element={<Authors canEdit={user} />} />
          <Route path="/books" element={<Books />} />
          {token && <Route path="/add" element={<NewBook setError={notify} />} />}
          {token && <Route path="/recommend" element={<Recommend />} />}
          <Route
            path="/login"
            element={<LoginForm setToken={setToken} setError={notify} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
