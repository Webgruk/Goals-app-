import axios from 'axios'

const API_URL = 'api/goals/'

// create goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, goalData, config)
  return response.data
}

// get all goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// delete goals
const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}

// update goal

const updateGoal = async (id, text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + id, { text }, config)
  console.log(response.data)

  return response.data
}

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal,
}

export default goalService
