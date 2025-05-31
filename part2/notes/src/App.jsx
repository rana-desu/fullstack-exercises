import { useState, useEffect } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // only executes after the first render
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
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(newNoteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')

        setErrorMessage(
          `${returnedNote.content} was added.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
    
    // PUT request changes a part of the resource
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        notes.map(note => note.id === id ? returnedNote : note)
      })
      .catch(error => {
        setErrorMessage(
          `Note ${note.content} was already deleted from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000) // displays error message for 5 seconds
        setNotes(notes.filter(n => n.id !== id))

        console.log(error)
      })
  }

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)} className="standard-buttons">
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
        <button type="submit" className="standard-buttons">save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App