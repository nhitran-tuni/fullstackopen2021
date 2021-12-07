const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (
  <div>
    {parts.map(p => <Part key={p.name} part={p} />)}
  </div>
);

const Total = ({ text }) => <p><b>{text}</b></p>

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content 
      parts={course.parts}
    />
    <Total
      text={`Total of ${course.parts.reduce((a,b) => a + b.exercises, 0)} exercises`}
    />
  </div>
);

export default Course
