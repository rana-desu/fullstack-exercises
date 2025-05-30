import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const render = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newPersonObject) => {
    return axios.post(baseUrl, newPersonObject).then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (newPersonObject) => {
    console.log(newPersonObject)
    console.log(newPersonObject.id)
    
    return axios.put(`${baseUrl}/${newPersonObject.id}`, newPersonObject).then(response => response.data)
}

export default { render, create, remove, update }