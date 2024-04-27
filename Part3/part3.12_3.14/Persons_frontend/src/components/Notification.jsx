const Notification = ({ type, message }) => {
    if (message === null) {
      return null
    }
    if (type === "error") {
      return (
        <div className="error">
        {message}
      </div>
      )
    } else if (type === "notify") {
      return (
        <div className="notify">
        {message}
      </div>
      )
    }
}
  
export default Notification