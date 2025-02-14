import request from "../request";


export const GetArtWorkData = async (params: {
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
    const data = await request({
        url: "/art/workInfo/queryAllArtWorkData",  // 请求的路径
        method: "GET",  // 请求方法
        params
    });
    //设置高度
    data.records.forEach((item: any) => {
        item.height = Math.random() * 100 + 200;
    })
    return data;
}

export const GetCategorys = () => {
    return request({
        url: "/art/category/getCategory",
        method: "GET"
    })
}

export const GetArtWorkInfo = (params: {
    id: any
}) => {
    return request({
        url: "/art/workInfo/getLitArtworkInfoVo",
        method: "GET",
        params
    })
}