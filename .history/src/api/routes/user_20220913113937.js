const express = require('express')

// const { addUser, getUser } =require('../controllers/user')
const router = express.Router()
// const { protect, authorize } = require('../middlewares/auth')
// const { paginate } = require('../middlewares/paginate')
const User = require('../models/User')

// User Routes
router.route('/update').patch(addUser)
router.route('/update').patch(addUser)

// router.route('/').get(paginate(User), getUser)

module.exports = router