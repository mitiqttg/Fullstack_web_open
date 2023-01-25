const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <p>Course name: {course.name}</p>
      <p>Content:</p>
      <ul>
        <li>{course.parts[0].name}</li>
        <li>{course.parts[1].name}</li>
        <li>{course.parts[2].name}</li>
      </ul>

      <p>Total exercises: {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p> 
    </div>
  )
}
export default App
