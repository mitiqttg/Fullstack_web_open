const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification ? '' : 'none'
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
