import request from "@/utils/request";

export function globalSearch(keyword, page = 0, size = 10) {
    return request({
        url: '/api/search',
        params: {
            keyword: keyword,
            page: page,
            size: size
        }
    })
}

export function advancedSearch(
    keywordFields,
    page = 0,
    size = 10,
    indices = ['herbs_info_v2', 'prescriptions', 'disease']) {
    return request({
        url: '/api/search/advanced',
        method: 'post',
        data: {
            keywordFields: keywordFields,
            page: page,
            size: size,
            indices: indices,
            highlight: true
        }
    })
}

export function miniSearchName(indices, keyword, size) {

    let kef = [ { "id": 1, "keyword": keyword, "treeValue": [ "chineseName" ], "enabled": 1 } ]
    return request({
        url: '/api/search/advanced',
        method: 'post',
        data: {
            keywordFields: kef,
            page: 0,
            size: size,
            indices: indices,
            highlight: false
        }
    })
}