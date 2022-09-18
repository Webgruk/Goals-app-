const jwt = require('jsonwebtoken')
const bcyrpt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')
const { find, findById } = require('../models/userModels')

// desc Register new user
// route Post/api/user
// access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('please add all fields')
  }

  // check if user exist

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('user already exists')
  }

  //hash password
  const salt = await bcyrpt.genSalt(10)
  const hashedPassword = await bcyrpt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// desc Authenticate user
// route Post/api/users/login
// access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await bcyrpt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('invalid credentials')
  }
})

// desc get user data
// route Post/api/user/me
// access private

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// generateToken

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = { registerUser, getMe, loginUser }
