import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import CardTask from './cardTask'
import { deleteTaskServer, updateTaskServer } from './connectServer/taskcontroller'
import { getUsersTasklListServer } from './connectServer/userController'

export default function ShowTasks(props) {
    const user = props.user
    const [taskList, setTaskList] = useState([{}])
    const [progress,setProgress]=useState(0)
    const [mesProgress,setMesProgress]=useState('')

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

    function handelrUpdate(taskId, title, completed) {
        const updatedList = taskList.map(item => {
            if (item._id == taskId) {
                return { ...item, title: title, completed: completed };
            }
            return item;
        });

        setTaskList(updatedList);
        console.log(taskList);
    }

    async function deleteTask(task_id) {
        setProgress(100)
        console.log(task_id);
        const res = await deleteTaskServer(task_id, user.token)
        if (res.status == 200) {
            // alert('success')
            setMesProgress('success!!!')
            handleRemove(task_id)
        }
        else {
            setMesProgress('faild!!!')
             console.log("faild!" + res.response.data.toString())
        }
        setProgress(0)
    }

    async function updateTask(task_id, title, completed) {
        setProgress(100)
        const res = await updateTaskServer(title, completed, user.token, task_id)
        if (res.status == 200) {
            // alert('success!!')
            setMesProgress('success!!!')
            handelrUpdate(task_id, title, completed)
            console.log(taskList);

        }
        else {
            // alert("faild!" + res.response.data.toString())
            console.log("faild!" + res.response.data.toString());
            handelrUpdate(task_id, title, completed)
            setMesProgress('faild!!!')
        }
        setProgress(0)
    }

    return (
        <>
            <div className="container-fluid mt-5 ">
            <div className="progress fixed-top">
                    <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{width: `${progress}%`}}
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >{mesProgress}</div>
                </div>
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

