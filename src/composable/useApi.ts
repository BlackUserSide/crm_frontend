import { useUserSession } from "/@src/stores/userSession";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "vue-router";

let api: AxiosInstance;

export function createApi() {
  // Here we set the base URL for all requests made to the api
  api = axios.create({
    // baseURL: "http://3.68.77.199/api",
    baseURL: "http://localhost:8007/api", //"https://spectrum-team.net/api",
    withCredentials: true,
  });
  api.interceptors.request.use((config) => {
    const userSession = useUserSession();
    config.headers = {
      ...config.headers,
      Authorization: userSession.token ? `Bearer ${userSession.token}` : false,
    };
    return config;
  });
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const userSession = useUserSession();

      if (err.response) {
        switch (err.response.status) {
          case 401:
            localStorage.removeItem("token");
            window.location.href = "/";
            return;
          case 404:
            break;
        }
        return Promise.reject(err.response.data);
      }
    }
  );
  // We set an interceptor for each request to
  // include Bearer token to the request if user is logged in

  return api;
}

export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}
