import request from "@/utils/request";

export function getPersonalInfo() {
    return request({
        url: '/api/account/userinfo'
    })
}

export function updatePersonalInfo(form) {
    return request({
        url: '/api/account/userinfo',
        method: "post",
        data: form
    })
}

export function updatePassword(form) {
    return request({
        url: '/api/account/newPwd',
        method: "post",
        data:form
    })
}

export function getSecurity() {
    return request({
        url: '/api/account/security',
    })
}

export function getOldPosts() {
    return request({
        url: '/api/account/post'
    })
}

export function getFavourite() {
    return request({
        url: '/api/account/favourite'
    })
}

export function getAvatar() {
    return request({
        url: '/api/account/avatar'
    })
}