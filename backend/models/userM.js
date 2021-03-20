const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 10,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validate({
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'email is not valid'
        })
    },
    tasksList: [{
        type: mongoose.Types.ObjectId,
        ref: 'Task'
    }]
})


module.exports = mongoose.model('User', userSchema)