import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import CardTask from './cardTask'
import { deleteTaskServer, updateTaskServer } from './connectServer/taskcontroller'
import { getUsersTasklListServer } from './connectServer/userController'

export default function ShowTasks(props) {
    const user = props.user
    const [taskList, setTaskList] = useState([{}])

    useEffect(async function () {
        const res = await getUsersTasklListServer(user._id, user.token)
        if (res.status == 200) {
            console.log(res.data.tasksList);
            await setTaskList(() => res.data.tasksList)
        }
    }, [])

    function handleRemove(taskId) {
        const newList = taskList.filter((item) => item._id !== taskId);
        setTaskList(newList);
    }

    function handelrUpdate(taskId,title,completed){
        const updatedList = taskList.map(item => 
            {
              if (item._id == taskId){
                return {...item, title: title,completed:completed}; 
              }
              return item; 
            });
        
          setTaskList(updatedList);
          console.log(taskList);
    }

    async function deleteTask(task_id) {
        console.log(task_id);
        const res = await deleteTaskServer(task_id, user.token)
        if (res.status == 200) {
            alert('success')
            handleRemove(task_id)
        }
        else {
            alert("faild!" + res.response.data.toString())
        }
    }

    async function updateTask(task_id, title, completed) {
        const res = await updateTaskServer(title, completed, user.token, task_id)
        if (res.status == 200) {
            alert('success!!')
            handelrUpdate(task_id,title,completed)
            console.log(taskList);

        }
        else{
            alert("faild!" + res.response.data.toString())
            handelrUpdate(task_id,title,completed)
            
        }
    }

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="row m-0 mt-5">
                    {taskList.map((item, index) => {
                        return <CardTask
                            key={index}
                            taskId={item._id}
                            title={item.title}
                            completed={item.completed}
                            index={index}
                            delete={deleteTask}
                            update={updateTask}>
                        </CardTask>

                    })}
                </div>
            </div>
        </>
    );
}

