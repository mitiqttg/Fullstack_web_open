const dummy = () => {
  return 1
}
const totalLikes = (blogs) => {
  // const reducer = (element, item) => {
  //   return element.likes + item
  // }

  return blogs.length === 0 ? 0 : blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0,)
}
const favoriteBlog = (blogs) => {
  let result = {}
  const _ = require('lodash')
  for (let i = 0; i < blogs.length; i++) {
    if (_.isEmpty(result) || result.likes < blogs[i].likes) {
      result = blogs[i]
    }
  }
  return result
}

const mostBlogs = (blogs) => {
  let groupByAuthor = {}
  const _ = require('lodash')
  groupByAuthor = _.groupBy(blogs,'author')
  let numberOfBlogbyAuthor = _.mapValues(groupByAuthor, value => value.length)
  let correctForm = _.map(numberOfBlogbyAuthor,function(key, value) {
    return {
      author: value,
      blogs: key
    }
  })
  let result = _.orderBy(correctForm,'blogs', 'desc')[0]
  console.log(result)
  return result
}
const mostLikes = (blogs) => {
  let groupByAuthor = {}
  const _ = require('lodash')
  groupByAuthor = _.groupBy(blogs,'author')
  let numberOfBlogbyAuthor = _.mapValues(groupByAuthor, value => value.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0,))
  let correctForm = _.map(numberOfBlogbyAuthor,function(key, value) {
    return {
      author: value,
      likes: key
    }
  })
  let result = _.orderBy(correctForm,'likes', 'desc')[0]
  console.log(result)
  return result
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}