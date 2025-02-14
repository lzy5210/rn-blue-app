import { GetArtWorkData } from '@/api/artwork/artwork';
import { GetUserInfo } from '@/api/user/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, createContext, useState, useEffect, useReducer } from 'react'
const AppContext: any = createContext(undefined)

// 1. 定义初始状态
const initialState = {
    userInfo: '',
    artworkList: [],
    indexTabs: [],
    topTabs: [],
    nextRefreshTimes: [],
    isStickyHeader: false
}

// 2. 创建 Reducer
const reducer = (state: typeof initialState, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return { ...state, userInfo: action.payload };
        case 'SET_ARTWORKS':
            return { ...state, artworkList: action.payload };
        case 'SET_INDEXTABS':
            return { ...state, indexTabs: action.payload };
        case 'SET_TOPTABS':
            return { ...state, topTabs: action.payload };
        case 'SET_REFRESHTIME':
            return { ...state, nextRefreshTimes: action.payload };
        case 'SET_STICKY_HEADER':
            return { ...state, isStickyHeader: action.payload };
        default:
            return state;
    }
};
function GlobleProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}
// 3. 自定义 Hook，供组件使用 Context
export const useGlobleContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useGlobleContext 必须在 GlobleProvider 内使用");
    }
    return context;
};

export default GlobleProvider
