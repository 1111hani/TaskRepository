import axios from 'axios'

//req- username,password
//res-user,token
export async function logInServer(userName, password) {

    const data = await axios.get(`http://localhost:9000/user/logIn?userName=${userName}&password=${password}`)
        .then(res => {
            return res
        })
        .catch(err => {
            console.log('error!! ', { ...err });
            return err
        })
    return data
}


//req- username,password,email
//res-user
export async function signUpServer(userName, password, email,) {
    const axios = require('axios');
    const data = JSON.stringify({ "userName": userName, "password": password, "email": email });

    const config = {
        method: 'post',
        url: 'http://localhost:9000/user/signUp',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const res = await axios(config)
        .then((response) => {
            console.log('1 success service ', JSON.stringify(response.data));
            console.log('2 success service ', response);
            return response
        })
        .catch((error) => {
            console.log('from service', error);
            return error
        });
    return res
}

//req-id user,token
//res- user+ full list
export async function getUsersTasklListServer(userId, token) {

    var axios = require('axios');

    var config = {
        method: 'get',
        url: `http://localhost:9000/user/getUserById/${userId}`,
        headers: {
            'Authorization': token
        }
    };

    const res = await axios(config)
        .then((response) => {
            console.log('success controller ', JSON.stringify(response.data));
            return response
        })
        .catch((error) => {
            console.log('err controller ', error);
            return error
        });

    return res
}

export async function forgotPasswordServer(userName, email) {
    var config = {
        method: 'get',
        url: `http://localhost:9000/user/forgotPassword?userName=${userName}&email=${email}`,
        headers: {}
    };

    const res = await axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response
        })
        .catch((error) => {
            console.log(error);
            return error
        });
    return res;

}









// export function hello() {
//     axios.get('http://localhost:9000/user/logIn')
//         .then(res => {
//             console.log(res);
//         })
//         .catch(err => {
//             console.log('error!! ', err);
//         })
// }