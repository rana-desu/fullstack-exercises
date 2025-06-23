const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  
  const notificationStyle = {
    border: '1px solid green',
    color: 'green',
    padding: '8px',
    marginBottom: '20px'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification