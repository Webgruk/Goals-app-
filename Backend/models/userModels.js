const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please add Name'],
    },
    email: {
      type: String,
      required: [true, 'please add email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please include password'],
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
