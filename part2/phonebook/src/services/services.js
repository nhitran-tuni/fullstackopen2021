import axios from "axios"
import { serverUrl } from "./constant";

const getAllPhoneList = () => {
  return axios.get(serverUrl);
}

const createNewPerson = newPerson => {
  return axios.post(serverUrl, newPerson)
}

const deletePerson = (id) => {
  return axios.delete(`${serverUrl}/${id}`)
}

const updatePerson = (id, newPerson) => {
  return axios.put(`${serverUrl}/${id}`, newPerson)
}

//eslint-disable-next-line
export default { 
  getAllPhoneList,
  createNewPerson,
  deletePerson,
  updatePerson
}
