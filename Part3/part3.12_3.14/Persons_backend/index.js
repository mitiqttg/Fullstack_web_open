const express = require('express')
var morgan = require('morgan')
const app = express()
require('dotenv').config()

const Person = require('./models/person')
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

const cors = require('cors')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}   

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

app.get('/', (request, response) => {
  response.send('<h1>Phone book</h1>')
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people </br> </br>${Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

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
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  // persons = persons.concat(person)

  // response.json(person)
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  // const person = persons.find(person => person.id === id)
    Person.findById(request.params.id).then(person => 
     { if (person) {
      response.json(person)
      } else {
      response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  console.log('persons deleted, remaining:', persons)
  response.status(204).end()
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
