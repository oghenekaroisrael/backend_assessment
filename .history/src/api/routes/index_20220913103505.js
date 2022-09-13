const express = require('express')


const router = express.Router()
const path = require('path')

const userRouter = require('./user')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs.html'))
})

router.use('/user', userRouter)

module.exports = router