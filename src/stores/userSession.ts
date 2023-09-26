import { defineStore } from "pinia";
import api from "../api";
import { useError } from "../composable/useError";
interface State {
  token: string | null;
  login: string | null;
  isLoggedIn: boolean;
  role: string;
  users: any;
}
export interface IloginUser {
  login: string;
  password: string;
}
export const useUserSession = defineStore("userSession", {
  state: (): State => ({
    token: localStorage.getItem("token"),
    login: null,
    isLoggedIn: false,
    role: "",
    users: [],
  }),
  actions: {
    setUserLogin(login: string) {
      this.login = login;
    },
    async loginUser(data: IloginUser) {
      try {
        const res = await api.post("/spectrum/login", data);
        this.token = res.data.accessToken;
        localStorage.setItem("token", this.token!);
        this.isLoggedIn = true;
        this.login = res.data.user.login;
        this.role = res.data.role;
        console.log(res);

        return res.data.user.login;
      } catch (e) {
        useError("Неправильный логин или пароль");
      }
    },
    async getDataUser() {
      try {
        const res = await api.get("/spectrum/user");
        console.log(res.data);

        this.login = res.data.login;
        this.role = res.data.role;
      } catch {}
    },
    async getUsers() {
      try {
        const res = await api.get("/spectrum/user/all");
        console.log(res.data);

        this.users = res.data;
      } catch {}
    },
    logOutUser() {
      this.login = null;
      this.token = null;
      localStorage.removeItem("token");
      window.location.href = "/";
    },
  },
});
