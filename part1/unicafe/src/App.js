import React, { useState } from 'react'

const ButtonGroup = ({ stats, setStats }) => (
  <div className="feedback-btn">
    <button 
      key="good" 
      onClick={() => setStats({...stats, good: stats.good + 1})}
    >
      good
    </button>
    <button 
      key="neutral" 
      onClick={() => setStats({...stats, neutral: stats.neutral + 1})}
    >
      neutral
    </button>
    <button 
      key="bad" 
      onClick={() => setStats({...stats, bad: stats.bad + 1})}
    >
      bad
    </button>
  </div>
)

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ stats }) => {
  const sum = Object.keys(stats).map(s => stats[s]).reduce((a,b) => a + b, 0);
  
  if (sum === 0) return <p>No feedback given</p>

  return (
    <table>
      <tbody>
        {Object.keys(stats).map(s => <StatisticsLine key={s} text={s} value={stats[s]} />)}
        <StatisticsLine text="all" value={sum} />
        <StatisticsLine text="average" value={(stats.good - stats.bad)/sum} />
        <StatisticsLine text="percentage" value={`${(stats.good / sum) * 100} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  return (
    <div>
      <h1>Give feedback</h1>
      <ButtonGroup stats={stats} setStats={setStats} />
      <h2>Statistics</h2>
      <Statistics stats={stats} />
    </div>
  )
}

export default App
