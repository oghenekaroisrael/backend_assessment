const express = require('express')

const { addUser, getUser, updateUser, getUsers } =require('../controllers/user')
const router = express.Router()
const { paginate } = require('../middlewares/paginate')
const User = require('../models/User')

/** 
 * Create A New User 
 * @route GET /api/users/:id
 * 
 * @body    firstName:  string,     -> Required
 *              lastName:   string, -> Required
 *              userId:     guid,   -> Not Required
 *              accountId:  guid    -> Not Required
 * 
 * @response    message: string,
 *              success: boolean  
 * **/
router.route('/create').post(addUser)

/** 
 * Update An Existing User 
 * @route GET /api/users/update/:id
 * @response    message: string,
 *              success: boolean
 * **/
router.route('/update').patch(updateUser)

/** 
 * Delete An Existing User 
 * @route GET /api/users/delete/:id
 * @response    message: string,
 *              success: boolean
 * **/
router.route('/delete').delete(addUser)

/** 
 * Get All Existing User 
 * @route GET /api/users/
 * @response success    boolean
 *           data       []
**/
router.route('/').get(paginate(User), getUsers)


/** 
 * Get An Existing User 
 * @route GET /api/users/:id
 * @response success    boolean
 *           data       {}
**/
router.route('/user').get(paginate(User), getUser)

module.exports = router