const express = require('express')

const { addUser, getUser, updateUser, getUsers, deleteUser } =require('../controllers/user')
const router = express.Router()
const { paginate } = require('../middlewares/paginate')
const User = require('../models/User')

/** 
 * Create A New User 
 * @route GET /api/users/create
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
 * @route GET /api/users/update
 * @response    message: string,
 *              success: boolean
 * **/
router.route('/update').put(updateUser)

/** 
 * Delete An Existing User 
 * @route GET /api/users/delete
 * @request userId: guid -> Not Required
 * @response    message: string,
 *              success: boolean
 * **/
router.route('/delete').delete(deleteUser)

/** 
 * Get All Existing User 
 * @route GET /api/users/
 * @response success    boolean
 *           data       User[]
**/
router.route('/').get(paginate(User), getUsers)


/** 
 * Get An Existing User 
 * @route GET /api/users/user
 * @request userId: guid -> Not Required
 * @response success    boolean
 *           data       {}
**/
router.route('/user').get(paginate(User), getUser)

module.exports = router