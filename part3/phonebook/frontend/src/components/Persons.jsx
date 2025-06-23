const Person = ({ person, onRemove }) => {
  return ( 
    <div>
      <p>
        {person.name}
        {' '}
        {person.phoneNumber}
      </p>
      <button onClick={() => onRemove(person.id)}>
        delete
      </button>
    </div>
  )
}

const Persons = ({ persons, onRemove }) => {
  return (
    <div>
      {persons.map(person =>
        <Person 
          key={person.id} 
          person={person}
          onRemove={onRemove}
        />
      )}
    </div>
  )
}

export default Persons