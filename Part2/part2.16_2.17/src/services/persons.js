import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  // const nonExisting = {
  //   name: "Phil Foden",
  //   number: 47,
  //   id: 10000,
  // }
  // return request.then(response => response.data.concat(nonExisting))
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {  
  // confirm(`Delete ?`)
  return axios.delete(`${baseUrl}/${id}`)
  .then(response => response.data.filter(person => person.id !== id))
  .catch(error => {
      console.error('There was an error!', error);
  });
}

const updatePerson = (id, newNumber) => {
  return axios.put(`${baseUrl}/`+id, newNumber)
  .then(response => response.data)
  .catch(error => {
    console.error('There was an error updating!', error);
});

}

export default { 
  getAll, create, deletePerson, updatePerson 
}