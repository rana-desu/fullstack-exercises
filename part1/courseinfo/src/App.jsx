const Header = (props) => {
  console.log(props);

  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props);

  const [first, second, third] = props.parts

  return (
    <>
      <p>{first.name} {first.exercises}</p>
      <p>{second.name} {second.exercises}</p>
      <p>{third.name} {third.exercises}</p>
    </>
  )
}

const Total = (props) => {
  console.log(props);

  const [first, second, third] = props.parts

  return (
    <>
      <p>Number of exercises: {first.exercises + second.exercises + third.exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: "Half Stack Application Development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
  
      {
        name: "Using props to pass data",
        exercises: 7,
      },
  
      {
        name: "State of a component",
        exercises: 14,
      },
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App