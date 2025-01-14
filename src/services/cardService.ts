import axios from "axios";
import { AddCard } from "../interfaces/Card";

const API = `${import.meta.env.VITE_API_KEY}/cards`;



export function getCards() {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API,
        headers: {}
    };

    return axios.request(config)

}

export function getCardById(id: string) {
    return axios.get(`${API}/${id}`);
}

export function getMyCards(token: string) {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API}/my-cards`,
        headers: {
            'x-auth-token': token
        }
    };

    return axios.request(config)
}

export function createCard(cardDetails: AddCard) {


    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: API,
        headers: {
            'x-auth-token': sessionStorage.getItem("token")
        },
        data: cardDetails
    };

    return axios.request(config)

}

export function updateCard(cardId: string, card: AddCard) {
    let data = card;

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${API}/${cardId}`,
        headers: {
            'x-auth-token': sessionStorage.getItem("token")
        },
        data: data
    };

    return axios.request(config);

}

export function cardDelete(cardId: string, cardBizNum: number) {
    let data = cardBizNum;

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${API}/${cardId}`,
        headers: {
            'x-auth-token': sessionStorage.getItem("token")
        },
        data: data
    };

    return axios.request(config);

}

