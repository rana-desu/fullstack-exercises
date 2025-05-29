const Course = ({ course }) => {
  const courseName = course.name
  const parts = course.parts

  let totalExercises = parts.reduce((sum, part) => {
    return part.exercises + sum
  }, 0)

  console.log(totalExercises)
  
  return (
    <div>
      <h2>{courseName}</h2>
        {parts.map(part =>
          <p key={part.id}>
            {part.name}
            {" "}
            {part.exercises}
          </p>
        )}
        <p>total number of exercises for this course: {totalExercises}</p>
    </div>
  )
}

export default Course