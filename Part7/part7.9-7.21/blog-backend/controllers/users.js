const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (!username || !password) {
    return response.status(400).json({ error: 'username and password are required' })
  }
  
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'Username or password must have at least 3 characters' })
  }

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {

  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, likes: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

module.exports = usersRouter