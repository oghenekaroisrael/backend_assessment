const express = require('express')

const { addUser, getUser } =require('../controllers/user')
const router = express.Router()
// const { protect, authorize } = require('../middlewares/auth')
const { paginate } = require('../middlewares/paginate')
const User = require('../models/User')



//this makes sure the user is logged in can only see their conversations
// router.use(protect)
// router.use(authorize('customer'))
// User Routes
// router.route('/update').post(addUser)

// router.route('/').get(paginate(User), getUser)

module.exports = router