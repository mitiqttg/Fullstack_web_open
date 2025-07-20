import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  console.log('getAllUsers response:', response.data)
  return response.data
}

const addNewUser = async userData => {
  const response = await axios.post(baseUrl, userData)
  console.log('addNewUser response:', response.data)
  return response.data
}

export default { getAllUsers, addNewUser }
