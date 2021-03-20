import axios from 'axios'


export async function addTaskServer(userId, task, token) {

    // const axios = require('axios');
    const data = JSON.stringify({ "userId": userId, "title": task });

    const config = {
        method: 'post',
        url: 'http://localhost:9000/task/addTask',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        data: data
    };

    const res = await axios(config)
        .then((response) => {
            console.log('res from controller ', JSON.stringify(response.data));
            return response
        })
        .catch((error) => {
            console.log('err from controller ', error);
            return error
        });

    return res
}

export async function deleteTaskServer(taskId, token) {

    var config = {
        method: 'delete',
        url: `http://localhost:9000/task/deleteTask/${taskId}`,
        headers: {
            'Authorization': token
        }
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
    return res
}

export async function updateTaskServer(title, completed, token, taskId) {
    var data = JSON.stringify({ "title": title, "completed": completed });

    var config = {
        method: 'patch',
        url: `http://localhost:9000/task/updateTask/${taskId}`,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        data: data
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
    return res
}