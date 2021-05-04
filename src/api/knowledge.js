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

export function getSymptomById(id) {
    return request({
        url: '/api/knowledge/symptom/' + id
    })
}

export function getHerbById(id) {
    return request({
        url: '/api/knowledge/herb/' + id
    })
}

export function getPrescriptionById(id) {
    return request({
        url: '/api/knowledge/prescription/' + id
    })
}

export function feedback(form) {
    return request({
        url: '/api/knowledge/feedback',
        method: 'post',
        data: form
    })
}

export function getHerbRelated(name) {
    return request({
        url: '/api/knowledge/herbRelated',
        params: {
            name
        }
    })
}
export function getPrescriptionRelated(name) {
    return request({
        url: '/api/knowledge/prescriptionRelated',
        params: {
            name
        }
    })
}