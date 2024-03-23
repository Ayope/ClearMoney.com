import Cookies from "js-cookie";

export default function handleAuthData(data, setUser, navigate){

    const { refreshToken, accessToken, expirationTime } = data.tokens;
    
    Cookies.set('refreshToken', refreshToken);
    Cookies.set('accessToken', accessToken);

    localStorage.setItem("user", JSON.stringify(data.responseUser));

    setUser(JSON.parse(localStorage.getItem("user")));

    navigate("/?fromAuth=true");

}