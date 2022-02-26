import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const DrfApiFetch = () => {

  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState([])
  const [editedTask, setEditedTask] = useState({ id: '', title: '', author: '' })
  const [id, setId] = useState(1)
  const [token, setToken] = useState('')

  useEffect(() => {
    const url = 'http://127.0.0.1:8000/api/tasks/'
    axios.get(url, {
      headers: {
        'Authorization': 'Token 35fc63f58c3b12819eb6537fd7ca6223dfdb0076'
      }
    })
      .then((res) => { setTasks(res.data) })

    // tokenを取得するためにusernameとpasswordをpostにて送信。
    const url1 = 'http://127.0.0.1:8000/auth/'
    const data = {
      "username": 'rei',
      "password": 'rei'
    }
    axios.post(url1, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => setToken(res.data.token))
  }, [])

  const getTask = () => {
    const url = `http://127.0.0.1:8000/api/tasks/${id}/`
    axios.get(url, {
      headers: {
        'Authorization': `Token ${token}`
        // 'Authorization': 'Token 35fc63f58c3b12819eb6537fd7ca6223dfdb0076'
      }
    })

      .then((res) => { setSelectedTask(res.data) })
  }

  const getTask1 = (id) => {
    if (id === selectedTask.id) return // 同じtaskがクリックされたときに再取得を防ぐ
    const url = `http://127.0.0.1:8000/api/tasks/${id}`
    axios.get(url, {
      headers: {
        'Authorization': 'Token 35fc63f58c3b12819eb6537fd7ca6223dfdb0076'
      }
    })

      .then((res) => { setSelectedTask(res.data) })
  }

  const deleteTask = (id) => {
    const url = `http://127.0.0.1:8000/api/tasks/${id}/`
    axios.delete(url, {
      headers: {
        'Authorization': 'Token 35fc63f58c3b12819eb6537fd7ca6223dfdb0076'
      }
    })

      .then((res) => {
        setTasks(tasks.filter(task => task.id !== id));
        setSelectedTask([])
        if (editedTask.id === id) setEditedTask({ id: '', title: '', author: '' })
      })
  }

  const newTask = (task) => {
    const url = `http://127.0.0.1:8000/api/tasks/`
    const data = {
      title: task.title,
      author: task.author,
    }
    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 35fc63f58c3b12819eb6537fd7ca6223dfdb0076'
      }
    })

      .then((res) => { console.log(tasks, res.data); setTasks([...tasks, res.data]); setEditedTask({ id: '', title: '', author: '' }) })
  }

  const handleInputChange = () => (evt) => {
    console.log(evt.target)
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({ ...editedTask, [name]: value })
    console.log(editedTask)
  }

  const editTask = (task) => {
    const url = `http://127.0.0.1:8000/api/tasks/${task.id}/`
    axios.put(url, task, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 35fc63f58c3b12819eb6537fd7ca6223dfdb0076'
      }
    })
      .then((res) => {
        setTasks(tasks.map((task) => (task.id === editedTask.id ? res.data : task)));
        setEditedTask({ id: '', title: '', author: '' });
      })
  }

  return (
    <div>
      <ul>
        {

          tasks.map(task => <li style={{ cursor: 'pointer' }} key={task.id} onClick={() => getTask1(task.id)}>{task.title} PostedBy: {task.author}
            {/* <a onClick={() => getTask1(task.id)}>{task.id}</a> */}
            <button onClick={() => deleteTask(task.id)}>delete</button>
            <button onClick={() => setEditedTask(task)}>edit</button>
          </li>)
        }
      </ul>

      Set id <br />
      <input type='text' value={id} onChange={evt => { setId(evt.target.value) }} />
      <br />
      <button type='button' onClick={() => getTask()}>Get task</button>
      <h3>{selectedTask.title ? `${selectedTask.title} by ${selectedTask.author || 'undefined'} (id: ${selectedTask.id})` : ''}</h3>

      <input type='text' name='title' value={editedTask.title}
        onChange={handleInputChange()}
        placeholder='New task ?' required />
      <input type='text' name='author' value={editedTask.author}
        onChange={handleInputChange()}
        placeholder='author' required />

      {editedTask.id ?
        <button onClick={() => editTask(editedTask)}>Update</button> :
        <button onClick={() => newTask(editedTask)}>Create</button>}
    </div>
  )
}

export default DrfApiFetch