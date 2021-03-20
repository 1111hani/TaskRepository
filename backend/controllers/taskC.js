const Task = require('../models/taskM')
const User = require('../models/userM')
const jwt = require('jsonwebtoken')

const addTask = (req, res) => {
    // jwt.verify(req.headers['authorization'], process.env.SECRET, function (err, decoded) {
    //     if (err)
    //         res.status(400).send('not allow!!')
    //     else{
    //         const 
    //     }
    // })

    const newTask=new Task(req.body)
    newTask.save()
    .then(task=>{
        User.findByIdAndUpdate(task.userId,{$push:{tasksList:task._id}})
        .then(()=> res.status(200).send('success!'))
        .catch(err=>res.status(400).send('error push task to user'))
    })
    .catch(err=> res.status(400).send('error save task'))

}

const deleteTask=(req,res)=>{
    const taskToDelete=Task.findById(req.params.taskId)
    .then(task=>{
        Task.deleteOne({_id:task.id})
        .then(()=>{
            User.findByIdAndUpdate(taskToDelete.userId,{$pull:{tasksList:taskToDelete._id}})
            .then(()=>res.status(200).send('success'))
            .catch(err=>res.send(400).send('error delete task from user'))
        })
        .catch(err=>{
            res.status(400).send('Error delete task')
        })
    })
    .catch(err=>res.status(404).send('This task not found!!'))
}

const updateTask=(req,res)=>{
    Task.findByIdAndUpdate(req.params.taskId,{$set:{
        title:req.body.title,
        completed:req.body.completed
    }},{new:true})
    .then(()=>res.status(200).send('success update'))
    .catch(err=>res.status(400).send('error update task'))
}

module.exports={addTask,deleteTask,updateTask}