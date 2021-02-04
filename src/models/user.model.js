const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: { type: String, maxlength: 100, required: true },
    email: { type: String, maxlength: 100, required: true },
    password: { type: String, required: true },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'users',
  }
)

const PASSWORD_LENGTH = 8
const TOKEN_SECRET = 'secret'

userSchema.pre('save', async (next) => {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, PASSWORD_LENGTH)
  }

  next()
})

userSchema.methods.generateAuthToken = async () => {
  const user = this

  const { _id, name, email } = user

  const token = jwt.sign({ _id, name, email }, TOKEN_SECRET)
  user.tokens = user.tokens.concat({ token })

  await user.save()

  return token
}

userSchema.methods.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error({ error: 'Informações inválidas' })
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (isPasswordMatch) {
    throw new Error({ error: 'Informações inválidas' })
  }

  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
