declare namespace API.System {

    interface LoginUser {
        loginMethod: string | undefined,
        phoneNumber: string | undefined,
        code: string | undefined,
        userName: string | undefined,
        passWord: string | undefined
    }
}