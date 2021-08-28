import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (
  <div>
    {parts.map(p => <Part key={p.name} part={p} />)}
  </div>
)

const Total = ({ text, sum }) => <p>{text} {sum}</p>

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
      <Header course={course.name} />
      <Content 
        parts={course.parts}
      />
      <Total
        text="Number of exercises"
        sum={course.parts.map(p => p.exercises).reduce((a,b) => a + b, 0)}
      />
    </div>
  )
}

export default App
