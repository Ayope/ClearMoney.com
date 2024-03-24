import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3000";

export default function api(method, endpoint, data = null, retry = 0) {
  const url = `${BASE_URL}/${endpoint}`;

  return axios({
    method,
    url,
    data,
    withCredentials: true,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => handleErrors(error, method, endpoint, data, retry));
}

function handleErrors(error, method, endpoint, data, retry) {
  if (
    error.response &&
    error.response.data.statusCode === 401 &&
    error.response.data.message === "The provided token is expired"
  ) {
    return handleExpiredToken(error, method, endpoint, data, retry);
  } else {
    throw error;
  }
}

async function handleExpiredToken(error, method, endpoint, data, retry) {
  const refreshToken = Cookies.get("refreshToken");

  if (refreshToken && retry < 1) {
    try {
      const response = await refreshAccessToken(refreshToken);

      Cookies.set("accessToken", response.data.id_token);

      return api(method, endpoint, data, retry + 1);
    } catch (refreshError) {
      return redirectToLogin();
    }
  } else {
    return redirectToLogin();
  }
}

function redirectToLogin() {
  localStorage.removeItem("user");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  window.location.href = "/login";
}

async function refreshAccessToken(refreshToken) {
  return axios.post(
    `https://securetoken.googleapis.com/v1/token?key=AIzaSyAza9Wjys2agJ3V0CsgOnzhz8950-_bqY8`,
    {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }
  );
}