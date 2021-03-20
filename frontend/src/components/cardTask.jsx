import React, { useRef, useState } from 'react'
//
export default function CardTask(props) {
    const { taskId, title, completed, index } = props

    const completedRef = useRef(completed)
    const titledRef = useRef(title)

    const [dis, setDis] = useState(true)

    function handlerDisable() {
        if ((titledRef.current.value != title) || (completedRef.current.checked != completed))
            setDis(false)
        else
            setDis(true)
    }

    return (
        <div key={taskId} className="card text-white bg-secondary mb-3 mt-3 col-5 mx-3 d-inline-bloc" style={{ flexDirection: 'row' }}>
            <div className="card-header fw-bold">Task {index + 1}</div>
            <div className="card-body">
                <div className="form-check">
                    <input onChange={() => handlerDisable()} ref={completedRef} className="form-check-input btn-warning" type="checkbox" defaultChecked={completed} id="flexCheckChecked" ></input>
                    <label className="form-check-label" htmlFor="flexCheckChecked" />Completed
               </div>
                <textarea onChange={() => handlerDisable()} ref={titledRef} defaultValue={title} className="card-text"></textarea>
                {/* <button disabled={!dis} type="button" className="btn btn-warning text-secondary float-end mx-1" >Update</button> */}
                <button
                    disabled={dis}
                    onClick={()=>{props.update(taskId,titledRef.current.value,completedRef.current.checked); setDis(true)}}
                    type="button"
                    className="btn  btn-outline-warning float-end"
                   
                >Save Change</button>
            </div>
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                data-bs-toggle="tooltip"
                data-bs-placement="top" title="Delete this task"
                onClick={() => props.delete(taskId)}>
            </button>
        
        </div>
    )
}