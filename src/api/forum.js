import request from "@/utils/request";

export function getAllCategories() {
    return request({
        url: '/api/forum/category',
        method: 'get'
    })
}

export function getAllTypes() {
    return request({
        url: '/api/forum/type',
        method: 'get'
    })
}

export function getThreadByCategoryId(id, typeId = 0, sort = false, asc = false, byCreateTime = false) {
    return request({
        url: '/api/forum/thread',
        method: 'get',
        params: {
            categoryId: id,
            typeId: typeId,
            sort: sort,
            asc: asc,
            byCreateTime: byCreateTime,
        }
    })
}

export function getThreadByThreadId(id) {
    return request({
        url: '/api/forum/thread/' + id,
        method: 'get'
    })
}

export function postThread(data) {
    return request({
        url: '/api/forum/thread/post',
        method: 'post',
        data: data
    })
}

export function replyThread(data) {
    return request({
        url: '/api/forum/thread/reply',
        method: 'post',
        data: data
    })
}

export function viewThread(id) {
    return request({
        url: '/api/forum/thread/view/' + id,
        method: 'post'
    })
}

export function actionThread(id, key) {
    return request({
        url: '/api/forum/thread/' + key + '/' + id,
        method: 'post'
    })
}

export function actionComment(commentId, agreement) {
    return request({
        url: '/api/forum/thread/comment/' + commentId,
        method: 'post',
        params: {agreement}
    })
}

export function getAuthorByThreadId(threadId) {
    return request({
        url: '/api/forum/thread/author/' + threadId,
    })
}

export function getMyInfo() {
    return request({
        url: '/api/forum/my',
        method: 'get'
    })
}

export function searchByKeyword(keyword) {
    return request({
        url: '/api/forum/search',
        params: {
            keyword: keyword
        }
    })
}