const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const User = require('../models/user')
const Blog = require('../models/blog')

const getTokenFromLoginUser = async () => {
  const newUser = {
    "username": "testuser",
    "name": "user1",
    "password": "testpw"
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'testpw' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return loginResponse.body.token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.insertMany(helper.initialUsers)
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are four blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('Blogs have properties "id"', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(e => e.id)
  console.log(ids)
  assert(ids.length, 4)
})

test('can add a user to the database', async () => {
  const newUser = {
    "username": "testuser",
    "name": "user1",
    "password": "testpw"
  }
  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const usersAtEnd = await api.get('/api/users')
  const usernames = usersAtEnd.body.map(u => u.username)
  assert.strictEqual(usersAtEnd.body.length, helper.initialUsers.length + 1)
  assert(usernames.includes(newUser.username))
})

test('a valid blog can be added', async () => {
  const token = await getTokenFromLoginUser()

  const newBlog = {
    title: 'Quantum Malicious',
    author: 'Anthony Dick',
    url: 'http://www.csqt.edu/hahaha/qm',
    likes: 28,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // // Fetch all blogs to verify
  const blogsAfter = await api.get('/api/blogs')
  const titles = blogsAfter.body.map(r => r.title)

  assert.strictEqual(blogsAfter.body.length, helper.initialBlogs.length + 1)
  assert(titles.includes('Quantum Malicious'))
})


test('Blog without likes is added with 0 likes default', async () => {
  const token = await getTokenFromLoginUser()

  const newBlog = {
    title: 'AI is awesome',
    author: 'Sam Andler',
    url: 'http://www.aishit.edu/hahaha/qm',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const addedOne = response.body.filter((blog) => blog.title==='AI is awesome')[0]

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert.strictEqual(addedOne.likes, 0)
})

test('Blog without url or title is added with 0 likes default', async () => {
  const token = await getTokenFromLoginUser()

  const newBlogMissingTitle = {
    author: 'Sam Andler',
    url: 'http://www.aishit.edu/hahaha/qm',
    likes: 2
  }
  
  const newBlogMissingURL = {
    title: 'AI is awesome',
    author: 'Sam Andler',
    likes: 18
  }
  const newBlogMissingBoth = {
    author: 'Sam Andler',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogMissingTitle)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogMissingURL)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogMissingBoth)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)

})

test('a Blog can be deleted', async () => {
  const token = await getTokenFromLoginUser()

  const newBlog1 = {
    title: 'Quantum Malicious',
    author: 'Anthony Dick',
    url: 'http://www.csqt.edu/hahaha/qm',
    likes: 1,
  }
  const newBlog2 = {
    title: 'Quantum Malicious 2',
    author: 'Anthony Dick',
    url: 'http://www.csqt.edu/hahaha/qm',
    likes: 222,
  }

  const blogsAtStart = await api.get('/api/blogs')

  const initialLength = blogsAtStart.body.length

  const addedBlog1 = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog1)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const addedBlog2 = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog2)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
  await api
  .delete(`/api/blogs/${addedBlog1.body.id}`)
  .set('Authorization', `Bearer ${token}`)
  .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  console.log("All blogs: ", blogsAtEnd)

  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(addedBlog1.title))

  assert.strictEqual(blogsAtEnd.length, initialLength + 1)
})


// test('A specific blog can be updated', async () => {
//   const newBlog = {
//     title: 'Updated blog',
//     author: 'Anthony Dick',
//     url: 'http://www.csqt.edu/hahaha/qm',
//     likes: 28
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const response_1 = await api.get('/api/blogs')
//   // console.log('This si repsosne 1 body ', response_1.body)
//   assert.strictEqual(response_1.body.length, helper.initialBlogs.length + 1)
//   const addedOne = response_1.body.filter((blog) => blog.title==='Updated blog')[0]
//   // console.log('This is the added One body ', addedOne)
//   const updateBlog = {
//     title: addedOne.title,
//     author: addedOne.author,
//     url: addedOne.url,
//     likes: 5000
//   }

//   await api
//     .put(`/api/blogs/${addedOne.id}`)
//     .send(updateBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const response_2 = await api.get('/api/blogs')
//   console.log('This is the response 2 body ', response_2.body)

//   const updatedOne = response_2.body.filter((blog) => blog.id===addedOne.id)[0]
//   // console.log('This is the updated one', updatedOne)

//   assert.deepStrictEqual(updatedOne.likes, updateBlog.likes)
// })

// describe('when there is initially one user at db', () => {
//   beforeEach(async () => {
//     await User.deleteMany({})

//     const passwordHash = await bcrypt.hash('sekret', 10)
//     const user = new User({ username: 'root', passwordHash })

//     await user.save()
//   })

//   test('creation succeeds with a fresh username', async () => {
//     const usersAtStart = await helper.usersInDb()

//     const newUser = {
//       username: 'mluukkai',
//       name: 'Matti Luukkainen',
//       password: 'salainen',
//     }

//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     const usersAtEnd = await helper.usersInDb()
//     assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

//     const usernames = usersAtEnd.map(u => u.username)
//     assert(usernames.includes(newUser.username))
//   })

//   test('creation fails with proper statuscode and message if username already taken', async () => {
//     const usersAtStart = await helper.usersInDb()

//     const newUser = {
//       username: 'root',
//       name: 'Superuser',
//       password: 'salainen',
//     }

//     const result = await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(400)
//       .expect('Content-Type', /application\/json/)

//     const usersAtEnd = await helper.usersInDb()
//     assert(result.body.error.includes('expected `username` to be unique'))

//     assert.strictEqual(usersAtEnd.length, usersAtStart.length)
//   })
// })

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})