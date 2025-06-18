import { useState } from 'react'

// change to hide embarrassing misuse of "feat" convention in commits

const Button = ({ onClick, btnName }) => {
  return (
    <button onClick={onClick}>
      {btnName}
    </button>
  )
}

const StatsLine = ({ text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Stats = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <p>no feedback given</p>
    )
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatsLine text="good" value={good}/>
          <StatsLine text="neutral" value={neutral}/>
          <StatsLine text="bad" value={bad}/>

          <StatsLine text="total" value={total}/>
          <StatsLine text="average" value={average}/>
          <StatsLine text="positive" value={positive}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>

      <Button 
        onClick={handleGood}
        btnName="good"
      />
      <Button 
        onClick={handleNeutral}
        btnName="neutral"
      />
      <Button 
        onClick={handleBad}
        btnName="bad"
      />

      <Stats 
        good={good}
        neutral={neutral}
        bad={bad}
      />

    </div>
  )
}

export default App