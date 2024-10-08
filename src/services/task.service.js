// const api = 'https://node-for-mern.onrender.com/api'
const api = 'http://13.233.144.45:3500/api'
export const getAllTasks = () => {
  return new Promise((res, rej) => {
    fetch(api + '/task')
      .then((data) => data.json())
      .then((tasks) => res(tasks))
      .catch((er) => rej(er))
  })
}
export const addTask = (task) => {
  console.log(task)
  return new Promise((res, rej) => {
    fetch(api + '/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((data) => data.json())
      .then((tasks) => res(tasks))
      .catch((er) => rej(er))
  })
}
export const updateTask = (id, data) => {
  return new Promise((res, rej) => {
    fetch(api + '/task/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((tasks) => res(tasks))
      .catch((er) => rej(er))
  })
}
export const getTask = (id) => {
  return new Promise((res, rej) => {
    fetch(api + '/task/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((tasks) => res(tasks))
      .catch((er) => rej(er))
  })
}
export const deleteTask = (id) => {
  return new Promise((res, rej) => {
    fetch(api + '/task/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((tasks) => res(tasks))
      .catch((er) => rej(er))
  })
}
