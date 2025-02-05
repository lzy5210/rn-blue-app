import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

// API 基础地址
const BASE_URL = "http://101.43.99.167:8080"; // 可修改
// const BASE_URL = "http://192.168.146.1:8080"; // 可修改

/**
 * 统一封装 fetch 请求
 * @param {string} url 请求地址（相对路径）
 * @param {string} method 请求方法 (GET, POST, PUT, DELETE)
 * @param {object} params GET 请求参数（可选）
 * @param {object} body 请求体（可选）
 * @param {object} headers 请求头（可选）
 */
const request = async ({
    url,
    method = "GET",
    params = {},
    body = null,
    headers = {},
}: {
    url: string;
    method?: string;
    params?: Record<string, any>;
    body?: Record<string, any> | null;
    headers?: Record<string, string>;
}) => {
    try {
        // 处理 GET 请求的查询参数
        let queryString = "";
        if (method === "GET" && Object.keys(params).length > 0) {
            queryString = "?" + new URLSearchParams(params).toString();
        }

        // 获取 Token
        const token = await AsyncStorage.getItem("token");

        // 默认请求头
        const defaultHeaders: Record<string, string> = {
            "Content-Type": "application/json",
            ...headers,
        };

        // 如果存在 Token，则添加到请求头
        if (token) {
            defaultHeaders["Authorization"] = token;
        }

        // 发起请求
        const response = await fetch(`${BASE_URL}${url}${queryString}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : null,
        });

        // 解析 JSON 响应
        const responseData = await response.json();

        // 处理 401 未授权错误
        if (response.status === 401) {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem('loginId');
            Alert.alert("身份信息认证失败");
            return Promise.reject(new Error("Unauthorized"));
        }

        // 处理 503 服务器不可用
        if (response.status === 503) {
            Alert.alert("未知错误");
            return Promise.reject(new Error("Service Unavailable"));
        }
        return responseData; // 返回数据
    } catch (error) {
        console.error("请求错误:", error);
        return Promise.reject(error);
    }
};

export default request;
