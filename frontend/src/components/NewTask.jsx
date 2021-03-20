import React, { useState, useEffect } from 'react'
import { addTaskServer } from './connectServer/taskcontroller'

export default function NewTask(props) {

    const [toDoList, setTodoList] = useState([{}])
    const [currentTask, setCurrentTask] = useState('')
    const [hidden, setHidden] = useState(false)
    const user = props.user
    const [displaySucces, setDisplaySuccess] = useState('none')
    const [displayFaild, setDisplayField] = useState('none')

    useEffect(function () {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((data) => {
                data.json()
                    .then((res) => {
                        setTodoList(res)
                    })
            })
            .catch(err => console.log(err))
    }, [])

    async function req() {
        setHidden(true)
        console.log(user._id + " task: " + currentTask + " token: " + user.token);
        if (currentTask != '') {
            const res = await addTaskServer(user._id, currentTask, user.token)
            if (res.status == 200) {
                // alert('added! \n' + currentTask)
                setDisplaySuccess('block')
                setCurrentTask("")
            }
            else {
                setDisplayField('block')
                // alert('not adede: ' + res.response.data.toString())
            }
        }
        setHidden(false)
    }

    return (
        <>
            <div className="continer mt-5">
                <div className="row">
                    <div className="col-7 m-auto">
                        <h2 className="text-center text-warning"> Choose New Task</h2>
                        <input className="form-control"
                            list="datalistOptions"
                            id="exampleDataList"
                            placeholder="Type to search..."
                            value={currentTask}
                            onChange={e => { setCurrentTask(e.target.value) }}
                        ></input>
                        <datalist id="datalistOptions">
                            {toDoList.map((item, index) => {
                                return <option key={index} value={item.title}></option>
                            })}
                        </datalist>
                    </div>
                    {/* <div className="overflow-auto border border-info col-8" style={{height:'75vh'}}>
                {toDoList.map((item, index) => {
                    return(
                    <div className="col-6 d-inline" key={index}>
                        <input type="checkbox" />
                        <label>{item.title}</label>
                    </div>)
                })}

            </div> */}

                </div>
                <div className="row" >
                    <div className="col-7 m-auto mt-3 border border-3 border-warning rounded bg-secondary position-relative" style={{ height: '50vh' }}>
                        <div className="form-floating">
                            <textarea className="form-control mt-3" placeholder="Leave a comment here" id="showCurrTask" onChange={e => { setCurrentTask(e.target.value) }} value={currentTask} style={{ height: '100%' }}></textarea>
                            <label htmlFor="showCurrTask">Your choice:</label>
                        </div>
                        <div className="alert alert-success  mt-5" role="alert" style={{ display: displaySucces }}>
                            The task was successfully added!
                            <button 
                            type="button" 
                            className="btn-close float-e" 
                            style={{float:'right'}}
                            aria-label="Close"
                            onClick={()=>setDisplaySuccess('none')}></button>
                        </div>
                        <div className="alert alert-danger  mt-5" role="alert" style={{ display: displayFaild }}>
                            Failed to add task!
                            <button 
                            type="button"
                            style={{float:'right'}}
                            className="btn-close" 
                            aria-label="Close"
                            onClick={()=>setDisplayField('none')}></button>
                        </div>
                        <button className="btn btn-warning  position-absolute bottom-0 end-0 me-3 mb-3" onClick={() => req()}>
                            {hidden ? <span className="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true"></span> : ''}
                            + ADD TASK
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}