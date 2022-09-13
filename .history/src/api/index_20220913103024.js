const express = require('express')
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });
const ConnectDb = require('../config/db')

const app = express()
const http = require("http").createServer()

const indexRouter = require('./routes/index')
const errorHandler = require('./middlewares/error')

ConnectDb()
app.use(express.json({ strict: false }))

//Base Route
app.use('/api/v1/', indexRouter)

app.use(errorHandler)
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => { console.log(`program running in ${process.env.NODE_ENV} mode and listening on ${PORT} `) })
process.on('unhandledRejection', (err, promise) => {
    console.log(`Opps unhandled rejection😟\nError : ${err.message}`)
    server.close(() => { process.exit(1) })
})

module.exports = app;
