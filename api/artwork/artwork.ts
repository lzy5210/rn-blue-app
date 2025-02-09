import request from "../request";


export const GetArtWorkData = (params: {
    userId?: string | undefined,
    publishStatus?: string | undefined,
    artAuthStatus?: string | undefined,
    publishCity?: string | undefined,
    artworkType?: string | undefined,
    focusIds?: Array<string> | undefined,
    categoryIds?: Array<string> | undefined,
    pageSize?: any,
    pageNum?: any
}) => {
    return request({
        url: "/art/workInfo/queryAllArtWorkData",  // 请求的路径
        method: "GET",  // 请求方法
        params
    });
}

export const GetCategorys = () => {
    return request({
        url: "/art/category/getCategory",
        method: "GET"
    })
}


// export 