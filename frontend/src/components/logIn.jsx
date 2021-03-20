import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { forgotPasswordServer, logInServer } from './connectServer/userController'


export default withRouter(function LogIn(props) {
    const userNameRef = useRef('')
    const passwordRef = useRef('')
    const emailRef = useRef('')

    const setStoreUser = props.setStoreUser

    async function req() {
        if (userNameRef.current.value != '' && passwordRef.current.value != '') {
            const res = await logInServer(userNameRef.current.value, passwordRef.current.value)
            console.log('from componnent:', res);
            if (res.status == 200) {
                await setStoreUser(res.data)
                return props.history.push('/ShowTask')
            }
            else alert('error ' + res.response.data)//נסה שנית או הרשמה
        }
        else alert('enter name & pass')
    }

    async function reqForgotPass() {
        console.log('here!!');
        const res = await forgotPasswordServer(userNameRef.current.value, emailRef.current.value)
        if (res.status == 200)
            console.log('componnent', res);
        else console.log(res.response.data);
        emailRef.current.value = ''
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
                                    ref={userNameRef}
                                    placeholder="*Enter userName"
                                    className="form-control" />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="pass"
                                    id="pass"
                                    ref={passwordRef}
                                    placeholder="*Enter password"
                                    className="form-control" />
                            </div>
                            <div className="mb-3">
                                <button type="submit"
                                    className="form-control btn btn-warning"
                                    // disabled={!(userNameRef.current.value!='')}
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
                                <input type="email" ref={emailRef} className="form-control" placeholder="*Email..." aria-label="*Email..." aria-describedby="basic-addon2" />
                                <span className="input-group-text" id="basic-addon2">@example.com</span>
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

