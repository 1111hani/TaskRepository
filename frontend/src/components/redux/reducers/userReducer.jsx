import {produce} from 'immer'
import createReducer from './utilReducer'

const InitialState={
    user:{
        _id:'',
        userName:'',
        password:'',
        email:'',
        token:''
    }
}

const hanndlers={
    setStoreUser(state,action){
        state.user._id=action.payload.user._id
        state.user.userName=action.payload.user.userName
        state.user.password=action.payload.user.password
        state.user.email=action.payload.user.email
        state.user.token=action.payload.token
    }
}

export default produce((state,action)=>createReducer(state,action,hanndlers),InitialState);



