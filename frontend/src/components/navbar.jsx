import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Switch, Route, withRouter, Redirect } from 'react-router-dom'
import LogIn from './logIn'
import NewTask from './NewTask'
import { action } from './redux/action'
import ShowTasks from './showTasks'
import SignUp from './signUp'

function mapstateToProps(state) {
    return {
        user: state.userReducer.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    setStoreUser: (data) => dispatch(action.setStoreUser(data))
})

export default withRouter(connect(mapstateToProps, mapDispatchToProps)(function NavBar(props) {
    // const [userName, setUserName] = useState('---')
    const { user, setStoreUser } = props


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" >Tasks</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/Login' className="nav-link active" aria-current="page">LOGIN</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/SignUp' className="nav-link " aria-current="page">SIGNUP</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/NewTask' className="nav-link " aria-current="page">NEW TASK</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/ShowTask' className="nav-link " aria-current="page">SHOW TASKS</Link>
                            </li>
                        </ul>
                        <div className="container col-1">
                            <div className="text-warning fw-bold  float-end me-2"> {user.userName}</div>
                        </div>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route path="/Login">
                    <LogIn setStoreUser={setStoreUser} ></LogIn>
                </Route>
                <Route path="/SignUp">
                    <SignUp></SignUp>
                </Route>
                <Route path="/NewTask">
                    {user.token != '' ?
                        <NewTask user={user}></NewTask>
                        :
                        <Redirect to="/Login" />}
                </Route>
                <Route path="/ShowTask">
                    {user.token != '' ?
                        <ShowTasks user={user}></ShowTasks>
                        :
                        <Redirect to="/Login" />}
                </Route>
                <Route path="/">
                    <Redirect to="/Login"/>
                </Route>
            </Switch>
        </>
    );

}))