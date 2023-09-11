const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
const AuthRoute = require('./routes/auth')
const PostRoute = require('./routes/post')
const NotificationRoute = require('./routes/notification')
const notificationJob = require('./controllers/notificationScheduler');

mongoose.connect('mongodb://localhost:27017/distributed',{useNewUrlParser: true, useUnifiedTopology:true})

const db= mongoose.connection

db.on('error',(err)=> {
    console.log(err)
})

db.once('open', ()=>{
    console.log('Database connected')
})

const app= express()

app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.Port || 3002

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
})
app.use('/api/auth', AuthRoute)
app.use('/api/post', PostRoute)
app.use('/api/notification', NotificationRoute)
notificationJob.start();