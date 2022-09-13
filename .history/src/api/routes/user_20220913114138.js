const express = require('express')

const { addUser, getUser, updateUser } =require('../controllers/user')
const router = express.Router()
// const { protect, authorize } = require('../middlewares/auth')
// const { paginate } = require('../middlewares/paginate')
const User = require('../models/User')

// User Routes
router.route('/create').post(addUser)
router.route('/update/:id').patch(updateUser)
router.route('/update').patch(addUser)

// router.route('/').get(paginate(User), getUser)

module.exports = router