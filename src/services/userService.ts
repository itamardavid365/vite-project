import axios from "axios";
import User from "../interfaces/User";


const API = `${import.meta.env.VITE_API_KEY}/users`;
const APIRAW = `${import.meta.env.VITE_API_KEY}`;

export function loginUser(email: string, password: string) {

    let data = { email, password };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API}/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios.request(config);
}

export function registerUser(user: User) {
    let data = user

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: API,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios.request(config);

}

export function userLike(cardId: string) {
    let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `${APIRAW}/cards/${cardId}`,
        headers: {
            'x-auth-token': sessionStorage.getItem('token')
        }
    };

    return axios.request(config)

}

export function getUserById(userId: string) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API}/${userId}`,
        headers: {
            'x-auth-token': sessionStorage.getItem('token')
        }
    };

    return axios.request(config)
}