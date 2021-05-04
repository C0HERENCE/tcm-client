import request from "@/utils/request";

export function renderKaptcha() {
    return request({
        url: "/api/kaptcha/render"
    })
}

export function validKaptcha(code) {
    return request({
        url: "/api/kaptcha/valid",
        method: 'post',
        params: {
            code
        }
    })
}