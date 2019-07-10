export const isLogin = () => {
    let isLogin = false;
    let token = localStorage.getItem('token')
    isLogin = token ? true : false
    return isLogin;
}