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

export default PersonForm