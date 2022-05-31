/* jshint esversion:6 */
export const HOST = "http://localhost:8081/";
export const POST = 0;
export const COMMENT = 1;

export function dateFormat(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
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