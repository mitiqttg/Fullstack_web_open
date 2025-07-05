const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 6)
})

test('Blogs have properties "id"', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(e => e.id)
  console.log(ids)
  assert(ids.length, 6)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Quantum Malicious',
    author: 'Anthony Hopkids',
    url: 'http://www.csqt.edu/hahaha/qm',
    likes: 28
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(titles.includes('Quantum Malicious'))
})

test('Blog without likes is added with 0 likes default', async () => {
  const newBlog = {
    title: 'AI is awesome',
    author: 'Sam Andler',
    url: 'http://www.aishit.edu/hahaha/qm',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')

  const addedOne = response.body.filter((blog) => blog.title==='AI is awesome')[0]

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert.strictEqual(addedOne.likes, 0)
})

test('Blog without url or title is added with 0 likes default', async () => {
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
    .send(newBlogMissingTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogMissingURL)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogMissingBoth)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)

})

test('a Blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})


test('A specific blog can be updated', async () => {
  const newBlog = {
    title: 'Updated blog',
    author: 'Anthony Dick',
    url: 'http://www.csqt.edu/hahaha/qm',
    likes: 28
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response_1 = await api.get('/api/blogs')
  // console.log('This si repsosne 1 body ', response_1.body)
  assert.strictEqual(response_1.body.length, helper.initialBlogs.length + 1)
  const addedOne = response_1.body.filter((blog) => blog.title==='Updated blog')[0]
  // console.log('This is the added One body ', addedOne)
  const updateBlog = {
    title: addedOne.title,
    author: addedOne.author,
    url: addedOne.url,
    likes: 5000
  }

  await api
    .put(`/api/blogs/${addedOne.id}`)
    .send(updateBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response_2 = await api.get('/api/blogs')
  console.log('This is the response 2 body ', response_2.body)

  const updatedOne = response_2.body.filter((blog) => blog.id===addedOne.id)[0]
  // console.log('This is the updated one', updatedOne)

  assert.deepStrictEqual(updatedOne.likes, updateBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})