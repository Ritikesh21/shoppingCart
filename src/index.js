const express = require('express')
const app = express()

const {port, mongoString} = require('./config')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const multer = require('multer')
app.use(multer().any())
//JSON.stringify()

const route = require('./routes/route')
app.use('/', route)

const mongoose = require('mongoose')
mongoose.connect(mongoString, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true })
.then(console.log("MongoDb is Connected"))
.catch(error => console.log(error))

app.listen(port || 4000, () => {
    console.log("Connected to port" , port || 4000)
})