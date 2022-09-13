const mongoose = require('mongoose')

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const ConnectDb = async () => {
    const con = await mongoose.connect(process.env.MONGODB_URL, connectionParams)
    console.log(`connected to db on ${con.connection.host}`)
}

module.exports = ConnectDb