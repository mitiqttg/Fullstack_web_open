import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '1em' }}>
          <button><Link to="/authors">authors</Link></button>
          <button><Link to="/books">books</Link></button>
          <button><Link to="/add">add book</Link></button>
        </nav>

        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
          <Route path="*" element={<Authors />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
