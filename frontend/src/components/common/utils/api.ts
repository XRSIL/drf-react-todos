import { apiHost } from "../../../projectConstants";
import { methodType } from "./types";

const successStatuses = [200, 201];

export const callApi = (
    url: string, method: methodType = 'get', body = {}, contentType = 'application/json;'
) => {
    const requestParams: RequestInit = {
        headers: { 'content-type': contentType },
        method: method.toUpperCase(),
    }
    if (!['get', 'delete'].includes(method) ) {
        requestParams.body = JSON.stringify(body);
    }

    return fetch(apiHost + url, requestParams).then(response => {
        if (successStatuses.includes(response.status)) {
            return response.json();
        } else {
            return null;
        }
    })
}