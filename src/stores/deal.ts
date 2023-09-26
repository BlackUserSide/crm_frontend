import { defineStore } from "pinia";
import api from "../api";
import { useNotyf } from "../composable/useNotyf";
import { useError } from "../composable/useError";
interface State {
  rows: Array<any>;
  count: any;
  modal: Modal_elements;
  max_page: number;
  create: Create;
}
interface Modal_elements {
  offers: Array<Object>;
  country: Array<Object>;
  users: Array<Object>;
  partner: Array<Object>;
}
interface Create {
  offer_id: number | null;
  country_id: Array<number>;
  user_ids: Array<number>;
  partner_id: number | null;
  name: string | null;
}

export const useDeal = defineStore("deal", {
  state: (): State => ({
    rows: [],
    count: "",
    max_page: 0,
    modal: {
      offers: [],
      country: [],
      users: [],
      partner: [],
    },
    create: {
      offer_id: null,
      country_id: [],
      user_ids: [],
      partner_id: null,
      name: null,
    },
  }),

  actions: {
    setData(data: any) {
      this.rows = data.rows;
      this.max_page = data.max_page;
      this.count = data.count;
    },

    async postDeal(data: Create) {
      try {
        const values = Object.values(data);
        if (values.includes([]) || values.includes("")) {
          useError("Empty parametrs");
        }
        return await api.post(`/spectrum/deal`, data);
      } catch (error) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getDeal(offset: number, limit: number, search: any = null) {
      try {
        const params = new URLSearchParams(search).toString();

        const { data } = await api.get(
          `/spectrum/deal/${offset}/${limit}?${
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
    async getParamsModal() {
      try {
        const { data } = await api.get(`/spectrum/deal/modal`);
        this.modal.country = data.country;
        this.modal.partner = data.partner;
        this.modal.users = data.users;
        this.modal.offers = data.offers;
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },

    async updateDeal(update_data: any) {
      try {
        console.log(update_data);

        return await api.patch("/spectrum/deal", update_data);
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    getById(id: number) {
      return this.rows.find((e) => (e.id === id ? true : false));
    },
    async deleteDeal(id: number) {
      try {
        this.rows = this.rows.filter((e) => (e.id === id ? false : true));
        return await api.delete(`/spectrum/deal/${id}`);
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
