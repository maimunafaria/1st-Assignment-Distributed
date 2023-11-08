const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
const NotificationRoute = require('./routes/notification')
const notificationJob = require('./controllers/notificationScheduler');

mongoose.connect('mongodb://notification_db:27017/notificationdb',{useNewUrlParser: true, useUnifiedTopology:true})

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

const PORT = process.env.Port || 3012

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
})
app.use('/', NotificationRoute)
notificationJob.start();