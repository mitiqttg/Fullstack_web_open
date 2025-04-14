const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const isError = message.toLowerCase().includes('error')
  const className = isError ? 'error' : 'success'

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification