const router=require('express').Router()
const userC=require('../controllers/userC')
const checkAuth=require('../midlleware/checkAuth')

router.post('/signUp',userC.signUp)
router.get('/getUserById/:userId',checkAuth,userC.getUserById)
router.get('/logIn',userC.logIn)
router.get('/forgotPassword',userC.forgotPassword)



module.exports=router