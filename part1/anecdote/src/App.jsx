import { useState } from 'react'

const Button = ({ btnName, onClick }) => {
  return (
    <button onClick={onClick}>
      {btnName}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const handleNextAnecdote = () => {
    let next = getRandomInt(anecdotes.length - 1)
    console.log(next)

    setSelected(next)
  }

  const handleVotes = () => {
    const currentSelected = selected
    const updatedVotes = [...votes]
    updatedVotes[currentSelected] += 1

    const updatedMostVoted = updatedVotes.indexOf(Math.max(...updatedVotes))

    setVotes(updatedVotes)
    setMostVoted(updatedMostVoted)
  }

  const getRandomInt = (max) => Math.ceil(Math.random() * max)
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has votes: {votes[selected]}</p>

      <Button 
        btnName="vote"
        onClick={handleVotes}
      />
      <Button 
        btnName="next anecdote"
        onClick={handleNextAnecdote}
      />
      
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
      <p>has votes: {votes[mostVoted]}</p>
    </div>
  )
}

export default App