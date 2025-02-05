import request from "../request";


export const PostLoginUser = (data: API.System.LoginUser) => {
    return request({
        url: "/user/info/loginUser",
        method: "POST",
        body: data
    })
}


export const GetPhoneCode = (phone: string) => {
    return request({
        url: "/user/info/genPhoneCode",  // 请求的路径
        method: "GET",  // 请求方法
        params: { phone }  // 将 phone 作为 GET 请求的参数传递
    });
};
