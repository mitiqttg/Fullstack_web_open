
const Course = ({course}) => {
    const initial = 0
    return (
        
        course.map(course => 
        <div key={course.id}>
          <h2 key={course.id}>{course.name}</h2>
        <>           
            {course.parts.map( part =>
              <p key={part.id}>
                {part.name} {part.exercises}
              </p>
            )}
        </>
        <h3>
          Total of {course.parts.map(each => each.exercises).reduce((acc, curr) => acc+curr,initial)} exercises
        </h3>
       
        </div>
        )
        
      )
}
export default Course
