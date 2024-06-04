const Notification = ({ type, message }) => {
    if (message === null || message === '') {
      return null
    }

    if (type === 'error') {
      return (
        <div className='error'>
        {message}
      </div>
      )
    } 
    
    if (type === 'notify') {
      return (
        <div className='notify'>
        {message}
      </div>
      )
    }
}
  
export default Notification