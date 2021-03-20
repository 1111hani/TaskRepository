import React, { useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { signUpServer } from './connectServer/userController'
import {authMethodes} from './firebase/authMethods'

export default withRouter(function SignUp(props) {

    const userNameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')


   
    async function req() {
        if (userNameRef.current.value != '' && emailRef.current.value != '' && passwordRef.current.value != '') {
            authMethodes.signUp(emailRef.current.value,passwordRef.current.value)
            const res = await signUpServer(userNameRef.current.value, passwordRef.current.value, emailRef.current.value)
            console.log('1 from then compon ', res);
            if (res != undefined && res.status == 200) {
                console.log('2 from then compon ', res);
                return props.history.push('/Login')
            }
            // })        
        }
    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6 m-auto mt-3 ">
                    <div className="card card-body bg-secondary border border-3 border-warning rounded">
                        <h3 className="text-center text-warning">Sign up</h3>
                        <div className="mb-3">
                            <label htmlFor="email" className="text-light fw-bold form-label text-center">User name</label>
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                ref={userNameRef}
                                placeholder="*Enter userName"
                                className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="text-light fw-bold form-label text-center">Email address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                ref={emailRef}
                                placeholder="*Enter email"
                                className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="text-light fw-bold form-label text-center">Choose a password between 8-10</label>
                            <input
                                type="password"
                                name="pass"
                                id="pass"
                                ref={passwordRef}
                                placeholder="*Enter password"
                                className="form-control" />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="form-control btn btn-warning" onClick={() => req()}>SignUp</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
})