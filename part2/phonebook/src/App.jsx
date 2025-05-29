import { useState } from 'react'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      show with filter: 
      <input 
        type="text"
        value={value}
        onChange={onChange}
      />
      </div>
  )
}

const PersonForm = ({ onSubmit, values, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: 
        <input 
          type="text"
          value={values.name}
          onChange={onChange.name}
        />
        <br />
        number: 
        <input 
          type="text"
          value={values.phoneNumber}
          onChange={onChange.phoneNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person }) => {
  return ( 
    <p>
      {person.name}
      {' '}
      {person.phoneNumber}
    </p>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newSearchTerm, setNewSearchTerm] = useState('')

  const filterNames = (persons, term) => {
    return persons.filter(person => person.name.toLowerCase().includes(term))
  }

  let personsToShow = persons
  if (newSearchTerm !== '') { personsToShow = filterNames(persons, newSearchTerm) }

  // const personsToShow = newSearchTerm
  //   ? persons
  //   : persons.filter(person => person.name.includes(newSearchTerm));

  const addPerson = (event) => {
    event.preventDefault()

    const newPersonObject = {
      name: newName,
      phoneNumber: newPhoneNumber,
      id: persons.length + 1
    }

    const alreadyExists = persons.some(person => person.name === newPersonObject.name)
    if (alreadyExists) {
      alert(`${newPersonObject.name} already exists in the phonebook.`)
      return
    }

    setPersons(persons.concat(newPersonObject))
    setNewName('')
    setNewPhoneNumber('')
  }

  // value controllers for input fields
  const onNameInputChange = event => setNewName(event.target.value)
  const onPhoneNumberInputChange = event => setNewPhoneNumber(event.target.value)
  const onSearchInputChange = event => setNewSearchTerm(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearchTerm} onChange={onSearchInputChange} />

      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        values={{name: newName, phoneNumber: newPhoneNumber}}
        onChange={{name: onNameInputChange, phoneNumber: onPhoneNumberInputChange}}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App