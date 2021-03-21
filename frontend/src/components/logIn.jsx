import React, {  useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { forgotPasswordServer, logInServer } from './connectServer/userController'
import { validEmail, validPassword, validUserName } from './validation'


export default withRouter(function LogIn(props) {
    const [userName, setUserName] = useState('')
    const passwordRef = useRef('')
    const emailRef = useRef('')

    const [checkUserName, setCheckUserName] = useState({ status: false, message: '' })
    const [checkPassword, setCheckPassword] = useState({ status: false, message: '' })
    const [checkEmail, setCheckEmail] = useState({ status: false, message: '' })

    const setStoreUser = props.setStoreUser



    async function req() {
        console.log(checkUserName.message + ", " + userName);
        console.log('----------------------------------------');
        console.log(checkPassword.message, passwordRef.current.value);
        if (checkUserName.status == true && checkPassword.status == true) {
            const res = await logInServer(userName, passwordRef.current.value)
            console.log('from componnent:', res);
            if (res.status == 200) {
                await setStoreUser(res.data)
                return props.history.push('/ShowTask')
            }
            else alert('error ' + res.response.data)
        }
        else console.log(checkUserName.message, checkPassword.message)
    }

    async function reqForgotPass() {
        console.log('here!!');
        if (userName != '' && emailRef.current.value != '') {
            console.log(userName, emailRef.current.value);
            const res = await forgotPasswordServer(userName, emailRef.current.value)
            if (res.status == 200)
                console.log('componnent', res);
            else console.log(res.response.data);
            emailRef.current.value = ''
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6 m-auto mt-3 ">
                        <div className="card card-body bg-secondary border border-3 border-warning rounded">
                            <h3 className="text-center text-warning">Log in</h3>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    value={userName}
                                    placeholder="*Enter userName"
                                    className="form-control"
                                    onChange={(e) => { setUserName(e.target.value); setCheckUserName(validUserName(userName)) }} />
                                {checkUserName.status == false ? <div className="valid-feedback d-block text-danger">
                                    {checkUserName.message}
                                </div> : ''}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="pass"
                                    id="pass"
                                    ref={passwordRef}
                                    placeholder="*Enter password"
                                    className="form-control"
                                    onChange={() => { setCheckPassword(validPassword(passwordRef.current.value)) }} />
                                {checkPassword.status == false ? <div className="valid-feedback d-block text-danger">
                                    {checkPassword.message}
                                </div> : ''}
                            </div>
                            <div className="mb-3">
                                <button type="submit"
                                    className="form-control btn btn-warning"
                                    onClick={() => req()}> Login</button>

                            </div>
                            <div className="mb-3 text-center ">
                                <a href='#' data-bs-toggle="modal" data-bs-target="#exampleModal" className=" link-warning">Forgot Password</a>
                            </div>
                            <div className="mb-3 text-center">
                                <label className="text-warning">Want to join us?</label><a href='#' className="link-warning" onClick={() => { return props.history.push('/SignUp') }}> signUp</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal */}
            <div className="modal fade  " id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content bg-secondary">
                        <div className="modal-header">
                            <h5 className="modal-title text-warning" id="exampleModalLabel">Enter your mail</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-light">
                            <div className="input-group mb-3">
                                <input type="email" ref={emailRef} className="form-control" placeholder="*Email..." aria-label="*Email..." aria-describedby="basic-addon2"
                                    onChange={() => { setCheckEmail(validEmail(emailRef.current.value)) }} />
                                <span className="input-group-text" id="basic-addon2">@example.com</span>
                                {checkEmail.status == false ? <div className="valid-feedback d-block text-danger">
                                    {checkEmail.message}
                                </div> : ''}
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" value={userName} className="form-control" placeholder="*User name..." aria-label="*User name..." aria-describedby="basic-addon2"
                                    onChange={(e) => { setUserName(e.target.value); setCheckUserName(validUserName(userName)) }} />
                                <span className="input-group-text" id="basic-addon2">UserName</span>
                                {checkUserName.status == false ? <div className="valid-feedback d-block text-danger">
                                    {checkUserName.message}
                                </div> : ''}
                            </div>
                        </div>
                        <div className="modal-footer bg-light">
                            <p className="float-start text-secondary" >If you have identification, password will be sent to your email</p>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-warning text-light" onClick={() => reqForgotPass()}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

})

