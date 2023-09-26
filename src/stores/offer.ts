import { defineStore } from "pinia";
import api from "../api";
import { useNotyf } from "../composable/useNotyf";
import { useError } from "../composable/useError";
interface State {
  rows: Array<any>;
  count: any;
  max_page: number;
  create: Create;
  filter: Array<Filter>;
}
interface Create {
  offer: string;
  cost: number | string;
}
interface Filter {
  id: number | null;
  offer: string | null;
}

export const useOffer = defineStore("offer", {
  state: (): State => ({
    rows: [],
    count: "",
    max_page: 0,
    create: {
      offer: "",
      cost: 0,
    },
    filter: [],
  }),

  actions: {
    setData(data: any) {
      this.rows = data.rows;
      this.max_page = data.max_page;
      this.count = data.count;
    },

    async postOffer(data: Create) {
      try {
        if (data.offer === null) return useError("Empty offer!!!");
        if (data.cost === null) return useError("Empty cost!!!");

        return await api.post(`/spectrum/offer`, data);
      } catch (error) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getOffer(offset: number, limit: number, search: any = null) {
      try {
        const params = new URLSearchParams(search).toString();

        const { data } = await api.get(
          `/spectrum/offer/${offset}/${limit}?${
            params === "null=" ? "" : params
          }`
        );

        this.rows = data.rows;
        this.max_page = data.max_page;
        this.count = data.count;
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getAll() {
      try {
        const { data } = await api.get(`/spectrum/offer`);

        this.filter = data;
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async update_offer(update_data: any) {
      try {
        console.log(update_data);

        return await api.patch("/spectrum/offer", update_data);
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    getById(id: number) {
      return this.rows.find((e) => (e.id === id ? true : false));
    },
    async deleteOffer(id: number) {
      try {
        this.rows = this.rows.filter((e) => (e.id === id ? false : true));
        return await api.delete(`/spectrum/offer/${id}`);
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    setFilter(data: any) {
      const notyf = useNotyf();
      notyf.success("Фильтр применен");
    },
    // setStat(data: any) {
    //   this.stat = data;
    // },
  },
});
