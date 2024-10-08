import React, {Component} from 'react'
import {addTask, deleteTask, getAllTasks, updateTask} from './services/task.service'

export class Task extends Component {
  constructor() {
    super()
    const state_ = {
      tasks: [],
      currentTask: '',
    }
    this.state = state_
  }

  async componentDidMount() {
    try {
      const tasks = await getAllTasks()
      this.setState({tasks: tasks})
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({currentTask: e.target.value})
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await addTask({task: this.state.currentTask})
      console.log(data)
      this.setState((prevState) => ({tasks: prevState.tasks, data, currentTask: ''}))
    } catch (error) {
      console.log(error)
    }
  }

  handleUpdate = async (currentTask) => {
    const currentTasks = this.state.tasks
    try {
      const tasks = [...currentTasks]
      const index = tasks.findIndex((task) => task._id === currentTask)
      tasks[index] = {...tasks[index]}
      tasks[index].completed = !tasks[index].completed

      this.setState({tasks})
      await updateTask(currentTask, {completed: tasks[index].completed})
    } catch (error) {
      console.log(error)
    }
  }

  handleDelet = async (currentTask) => {
    const currentTasks = this.state.tasks
    try {
      const tasks = currentTasks.filter((task) => task._id !== currentTask)
      this.setState({tasks})
      await deleteTask(currentTask)
    } catch (error) {
      this.setState({tasks: currentTasks})
      console.log(error)
    }
  }

  render() {
    console.log(this.state)
    return <div>Task</div>
  }
}

export default Task
