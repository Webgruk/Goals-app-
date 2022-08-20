const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalsModel')
// @desc Get goals
//@route Get //api goal
// @access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
  res.status(200).json(goals)
})
// @desc set goals
//@route set //api goal
// @access private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error(' please provide text')
  }
  const goal = await Goal.create({
    text: req.body.text,
  })
  res.status(200).json(goal)
})
// @desc update goals
//@route update //api goal/:id
// @access private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    throw new Error('not found')
  }
  const updateGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json({ message: `update goal ${req.params.id}` })
})
// @desc delete goals
//@route delete //api goal/:id
// @access private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    throw new Error('not found')
  }
  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = { getGoals, setGoals, updateGoals, deleteGoals }
