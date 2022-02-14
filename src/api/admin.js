import request from "@/utils/request";

export function getAllUser() {
    return request({
        url: '/api/admin/allUser',
        method: 'get'
    })
}

export function getAllKnowledge(index, page=1, size=10) {
    return request({
        url: '/api/admin/allKnowledge',
        params: {
            index,
            page,
            size
        }
    })
}


export function advancedSearch(
    keywordFields,
    page = 0,
    size = 10,
    indices = ['herbs_info_v2', 'prescriptions', 'disease']) {
    return request({
        url: '/api/admin/advanced',
        method: 'post',
        data: {
            keywordFields: keywordFields,
            page: page,
            size: size,
            indices: indices
        }
    })
}


// 用户管理
export function addRole( userId, roleName) {
    return request({
        url: '/api/admin/user/role/add',
        method: 'post',
        params: {
            userId, roleName
        }
    })
}

export function removeRole(userId, roleName) {
    return request({
        url: '/api/admin/user/role/remove',
        method: 'post',
        params: {
            userId, roleName
        }
    })
}

export function getUserRoles(userId) {
    return request({
        url: '/api/admin/user/roles',
        method: 'get',
        params: {
            userId
        }
    })
}

export function setUserEnable( userId, enabled) {
    console.log(enabled)
    return request({
        url: '/api/admin/user/enabled',
        method: 'post',
        params: {
            userId, enabled
        }
    })
}

// 分类管理
export function updateCategory(CategoryId, title, english, intro) {
    return request({
        url: '/api/admin/category/update',
        method: 'post',
        params: {
            CategoryId, title, english, intro
        }
    })
}

export function addCategory(Title, english ,intro) {
    return request({
        url: '/api/admin/category/add',
        method: 'post',
        params: {
            Title, english, intro
        }
    })
}

// 帖子管理
export function SetThreadType(threadId, TypeId) {
    return request({
        url: '/api/admin/thread/setCategory',
        method: 'post',
        params: {
            threadId, TypeId
        }
    })
}

export function deleteThread( id, enabled) {
    return request({
        url: '/api/admin/thread/delete',
        method: 'post',
        params: {
            id,enabled
        }
    })
}

export function deleteComment(id,enabled) {
    return request({
        url: '/api/admin/comment/delete',
        method: 'post',
        params: {
            id,enabled
        }
    })
}

// 知识库管理
export function updateEs(index,id,field,value) {
    return request({
        url: '/api/admin/knowledge',
        method: 'post',
        params: {
            index,id,field,value
        }
    })
}

export function getAllCategories() {
    return request({
        url: '/api/admin/categories',
        method: 'get',
    })
}

export function categoryEnable(categoryId, enabled) {
    return request({
        url: '/api/admin/category/enable',
        method: 'post',
        params: {
            categoryId,
            enabled
        }
    })
}

export function getAllThreads(keyword, categoryId, typeId, authorId) {
    return request({
        url: '/api/admin/allThread',
        params: {
            keyword,
            categoryId,
            typeId,
            authorId
        }
    })
}

export function getAllFeedback() {
    return request({
        url: '/api/admin/feedback',
    })
}