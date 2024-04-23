const express = require('express')
const app = express()
var morgan = require('morgan')

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(express.json())
app.use(
  morgan(function (tokens, req, res) { 
    console.log(req)
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body) ? JSON.stringify(req.body) : `` 
    ].join(' ')
  })
)
// app.use(morgan(`:method :url :status :res[content-length] - :response-time ms ${req.body}`))

app.get('/', (request, response) => {
  response.send('<h1>Phone book</h1>')
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people </br> </br>${Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.random() * 1000000000
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if ( persons.map(person => person.name).includes(body.name) ) {
    return response.status(400).json({ 
      error: `${body.name} already exists in the phonebook` 
    })
  }

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: `The name or number is missing` 
      // error: `content missing: ${!body.name ? 'name' : 'maybe number'}` 
    })
  }
  

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    console.log('x')
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})