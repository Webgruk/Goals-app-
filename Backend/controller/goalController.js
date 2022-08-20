const asyncHandler = require('express-async-handler')
// @desc Get goals
//@route Get //api goal
// @access private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'get goal' })
})
// @desc set goals
//@route set //api goal
// @access private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error(' please provide text')
  }
  res.status(200).json({ message: 'set goal' })
})
// @desc update goals
//@route update //api goal/:id
// @access private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update goal ${req.params.id}` })
})
// @desc delete goals
//@route delete //api goal/:id
// @access private
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete goal ${req.params.id}` })
})

module.exports = { getGoals, setGoals, updateGoals, deleteGoals }
