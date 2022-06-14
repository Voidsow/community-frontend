/* jshint esversion:6 */
import { LOGOUT, messagePop } from "./store/mutation-type";
import store from "@/store/index";
import router from "@/router/index";
import AXIOS from "axios";

export const HOST = "http://localhost:8081/";
export const POST = 0;
export const COMMENT = 1;

export function dateFormat(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
}

export function getFetch(url) {
    return fetch(url, {
        method: "GET",
        credentials: "include",
    });
}

export function postFetch(url, data) {
    return fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

const axios = AXIOS.create({
    baseURL: "http://localhost:8081/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});


export function get(url, success, error = () => { }) {
    axios.get(url, {
        headers: {
            "Authorization": "Bearer " + store.state.token
        }
    })
        .then(resp => {
            if (resp.status === 200 && resp.data.code === 200) {
                success(resp.data.data);
            }
            else if (resp.data.code === 401) {
                store.commit(messagePop, "登录信息已过期，请重新登录", "");
                store.commit(LOGOUT);
                router.push({ name: "index" });
            }
            else {
                error(resp.data.message);
                store.commit(messagePop, resp.data.message, "error");
            }
        });
}

export function post(url, data, success, error) {
    if (store.state.token)
        axios.post(url, data, {
            headers: {
                "Authorization": "Bearer " + store.state.token
            }
        })
            .then(resp => {
                if (resp.status === 200 && resp.data.code === 200) {
                    success(resp.data.data);
                }
                else {
                    if (resp.data.code === 401) {
                        localStorage.removeItem("token");
                        store.commit(messagePop, "登录信息已失效，请重新登录", "");
                        store.commit(LOGOUT);
                        router.push("/");
                    }
                    else
                        store.commit(messagePop, resp.data.message, "error");
                    error(resp.data.message);
                }
            });
    //提示登录
    else {
        store.commit(messagePop, "请先登录", "");
    }
}