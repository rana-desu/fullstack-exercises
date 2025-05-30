import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // executes GET request using an effect
  // this effect only executes once after the first render
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const newNoteObject = {
      id: (notes.length + 1).toString(),
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(newNoteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled.`)
    const note = notes.find(n => n.id === id)
    console.log('previous note', note)
    const changedNote = { ...note, important: !note.important }
    console.log('changed note', changedNote)
    
    // put request changes a part of the resource
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        notes.map(note => note.id === id ? returnedNote : note)
      })
      .catch(error => {
        console.log(error)
        
        alert(
          `the note ${note.content} was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <form action="" onSubmit={addNote}>
        <input 
          type="text" 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App