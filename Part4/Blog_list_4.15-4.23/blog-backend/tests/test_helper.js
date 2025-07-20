const Blog = require('../models/blog')
const user = require('../models/user')
const User = require('../models/user')
const mongoose = require('mongoose')

const initialUsers = [
  {
    username: 'malasa',
    name: 'malasa',
    password: 'salainen',
    _id: new mongoose.Types.ObjectId('686b86ee795c7b0012f6b511'),
    blogs: [
      {
        _id: new mongoose.Types.ObjectId('11195c41131534cfa778dbc1'),
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      },
      {
        _id: new mongoose.Types.ObjectId('11195c41131534cfa778dbc2'),
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      }
    ]
  },
  {
    username: 'miti',
    name: 'MrT',
    password: '123456',
    _id: new mongoose.Types.ObjectId('222b86ee795c7b0012f6b522'),
    blogs: [
      {
        _id: new mongoose.Types.ObjectId('68695c41131534cfa778dbc3'),
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      },
      {
        _id: new mongoose.Types.ObjectId('68695c41131534cfa778dbc4'),
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      }
    ]
  },
]

const initialBlogs = [
  {
    _id: new mongoose.Types.ObjectId('11195c41131534cfa778dbc1'),
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'malasa',
      name: 'malasa',
      _id: new mongoose.Types.ObjectId('686b86ee795c7b0012f6b511')
    }
  },
  {
    _id: new mongoose.Types.ObjectId('11195c41131534cfa778dbc2'),
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'malasa',
      name: 'malasa',
      _id: new mongoose.Types.ObjectId('686b86ee795c7b0012f6b511')
    }
  },
  {
    _id: new mongoose.Types.ObjectId('68695c41131534cfa778dbc3'),
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      username: 'Miti',
      name: 'MrT',
      _id: new mongoose.Types.ObjectId('222b86ee795c7b0012f6b522')
    }
  },
  {
    _id: new mongoose.Types.ObjectId('68695c41131534cfa778dbc4'),
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: {
      username: 'Miti',
      name: 'MrT',
      _id: new mongoose.Types.ObjectId('222b86ee795c7b0012f6b522')
    }
  }
]


// const nonExistingId = async () => {
//   const blog = new Blog({ content: 'willremovethissoon' })
//   await blog.save()
//   await blog.deleteOne()

//   return blog._id.toString()
// }

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb, initialUsers
}