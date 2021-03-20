const  taskC=require('../controllers/taskC')
const router=require('express').Router()
const checkAuth=require('../midlleware/checkAuth')

router.post('/addTask',checkAuth,taskC.addTask)
router.delete('/deleteTask/:taskId',checkAuth,taskC.deleteTask)
router.patch('/updateTask/:taskId',checkAuth,taskC.updateTask)//לא בדקתי

module.exports=router