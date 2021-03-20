const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const env = require('dotenv')
env.config()

const userRouts = require('./routs/userR')
const taskRouts = require('./routs/taskR')

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => console.log('connect!!'))
    .catch(err => 'not connect')


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, authorization, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});


app.use(bodyParser.json())

// app.get('/hello',function(req,res){
//     res.send('hello from node!!')
// })
app.use('/user', userRouts)
app.use('/task', taskRouts)

app.listen(9000, () => {
    console.log('run 9000!');
})
