const dummy = (blogs) => {
  return 1;
}
const totalLikes = (blogs) => {
  const reducer = (element, item) => {
    return element.likes + item
  }

  return blogs.length === 0
  ? 0
  : blogs.reduce(reducer, 0)
}

module.exports = {
  dummy, totalLikes
}