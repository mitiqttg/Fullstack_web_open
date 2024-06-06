const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})
test('total likes of the object', () => {
  const blogs = [
    {
        title: "No family",
        author: "Hugo",
        url: "ww.hia",
        likes: 7
    },
    {
        title: "The Godfather",
        author: "Mario Puzo",
        url: "ww.hiafathergod",
        likes: 3
    },
    {
        title: "Harry Potter",
        author: "J.K Rowling",
        url: "ww.hiams",
        likes: 25
    },
  ]

  const result = listHelper.totalLikes(blogs)
  assert.strictEqual(result, 35)
})