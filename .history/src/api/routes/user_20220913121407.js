const express = require('express')

const { addUser, getUser, updateUser, getUsers } =require('../controllers/user')
const router = express.Router()
const { paginate } = require('../middlewares/paginate')
const User = require('../models/User')

/** 
 * Create A New User 
 * endpoint: /create
 * body: {
 *          firstName:  string,     -> Required
 *          lastName:   string,     -> Required
 *          userId:     guid,       -> Not Required
 *          accountId:  guid        -> Not Required
 *        }
 * response: {
 *              message: string,
 *              success: boolean  
 *          }
 * **/
router.route('/create').post(addUser)

/** 
 * Update An Existing User 
 * endpoint: /update/:id
 * params: id: guid -> Required
 * body: {
 *          firstName:  string,     -> Required
 *          lastName:   string,     -> Required
 *        }
 * response: {
 *              message: string,
 *              success: boolean  
 *          }
 * **/
router.route('/update/:id').patch(updateUser)

/** 
 * Delete An Existing User 
 * endpoint: /delete/:id
 * params: id: guid -> Required
 * response: {
 *              message: string,
 *              success: boolean  
 *          }
 * **/
router.route('/delete/:id').delete(addUser)

/** 
 * Get All Existing User 
 * @route GET /api/users/
 * @response 
**/
router.route('/').get(paginate(User), getUsers)

/** 
 * Get All Existing User 
 * endpoint: /:id
 * params: id: guid -> Required
 * response: {
 *              success: boolean  
 *              data: {}
 *          }
 * **/
router.route('/:id').get(paginate(User), getUser)

module.exports = router