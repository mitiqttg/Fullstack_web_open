import Course from "./components/Course"

const App = ({courses}) => {
  // console.log(courses[1].parts.map(each => each.exercises).reduce((acc, curr) => acc+curr),initial)
  return (
    <>
      <Course course={courses} />
    </>
  )
}

export default App
