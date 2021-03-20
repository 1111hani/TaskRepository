const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const User = require('../models/userM')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_MAIL
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

function sendMailWelcome(name, mail) {
    const mailOption = {
        from: process.env.EMAIL,
        to: mail,
        subject: 'welcome!!',
        text: `${name},\n Thank you for joining us!`
    }
    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log('error send mail: \n', err);

        }
        else { console.log('send mail success!'); }
    })
}

function sendMailPasword(name, mail, pass) {
    console.log(name + ":" + mail + ":" + pass);
    const mailOption = {
        from: process.env.EMAIL,
        to: mail,
        subject: 'Your password',
        text: `${name},\n Your password is: ${pass}`
    }
    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log('error send mail: \n', err);

        }
        else { console.log('send mail success!'); }
    })
}

const signUp = (req, res) => {
    const newUser = new User(req.body)
    newUser.save()
        .then(user => {
            sendMailWelcome(user.userName, user.email)
            res.status(200).send(user)
        })
        .catch(err => {
            res.status(400).send('Error save', err)
        })
}

const logIn = (req, res) => {
    User.findOne({ userName: req.query.userName, password: req.query.password })
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            res.status(200).json({ user, token })
        })
        .catch(err => res.status(404).send('not found user'))
}

const getUserById = (req, res) => {
    User.findById(req.params.userId).populate('tasksList', 'title completed')
        .then(user => {
            res.status(200).send(user)
        })
        .catch(err => res.status(400).send(err))

}

const forgotPassword = (req, res) => {
    User.findOne({ userName: req.query.userName, email: req.query.email })
        .then((user) => {
            sendMailPasword(user.userName, user.email, user.password)
            res.status(200).send('success!')
        })
        .catch(err => {
            res.status(400).send('error!!' + err)
        })
}



module.exports = { signUp, getUserById, logIn, forgotPassword }