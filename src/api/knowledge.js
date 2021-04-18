import request from "@/utils/request";

const knowledgeApi = {
    Category: "/api/knowledge/categories",
    Knowledge: '/api/knowledge/category/'
};


export function getCategoryByTypeId(typeId) {
    return request({
        url: knowledgeApi.Category,
        method: 'get',
        params: {type: typeId}
    })
}

export function getKnowledgeByCategoryId(categoryId) {
    return request({
        url: knowledgeApi.Knowledge + categoryId,
        method: 'get'
    })
}