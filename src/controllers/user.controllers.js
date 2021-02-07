const User = require('../models/user.models')

const registerNewUser = async (req, res) => {
  try {
    const isUser = await User.findOne({ email: req.body.email })

    if (isUser) {
      return res.status(409).json({ message: 'Sorry! This e-mail is already registered.' })
    }

    const userModel = new User(req.body)
    const user = await userModel.save()
    const token = await userModel.generateAuthToken()

    const { _id, name, email } = user

    return res.status(201).json({
      message: 'User created!',
      user: { _id, name, email },
      token,
    })
  } catch (error) {
    console.log('error', error)
    return res.status(400).json({ message: 'Algo deu errado', error })
  }
}

module.exports = {
  registerNewUser,
}
