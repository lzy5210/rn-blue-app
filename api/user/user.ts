import request from "../request";


export const GetUserInfo = (id: string) => {
    return request({
        url: "/user/info/queryUserInfo",  // 请求的路径
        method: "GET",  // 请求方法
        params: { id }  // 将 phone 作为 GET 请求的参数传递
    });
};