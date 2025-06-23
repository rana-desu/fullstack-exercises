const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make unimportant' : 'make important'

  return (
    <li className='notes'>
      {note.content}

      <button 
        onClick={toggleImportance}
        className='standard-buttons'
      >
        {label}
      </button>
    </li>
  )
}

export default Note