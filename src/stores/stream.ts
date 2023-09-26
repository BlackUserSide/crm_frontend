import { defineStore } from "pinia";
import api from "../api";
import { useNotyf } from "../composable/useNotyf";
import { useError } from "../composable/useError";
interface State {
  rows: Array<any>;
  count: any;
  max_page: number;
  create: Create;
  modal: IModal;
  domain_list: Array<any>;
  domain_in_stream: Array<any>;
}
export interface Create {
  name: string;
  comment: string;
  deal_id: number | null;
  countries: Array<any>;
}
interface IModal {
  countries: Array<any>;
  deals: Array<any>;
  domains: Array<string>;
}

export const useStream = defineStore("stream", {
  state: (): State => ({
    rows: [],
    count: "",
    max_page: 0,
    domain_list: [],
    domain_in_stream: [],
    create: {
      name: "",
      comment: "",
      deal_id: null,
      countries: [],
    },
    modal: {
      countries: [],
      deals: [],
      domains: [],
    },
  }),

  actions: {
    setData(data: any) {
      this.rows = data.rows;
      this.max_page = data.max_page;
      this.count = data.count;
    },

    async get_param() {
      try {
        const { data } = await api.get(`/spectrum/stream/params`);
        this.modal = data;
      } catch (error) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async get_domain_stream(id: number) {
      try {
        const { data } = await api.get(`/spectrum/stream/domain?id=${id}`);
        this.domain_in_stream = data;
      } catch (error) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async postDomain(data: any) {
      console.log(data);
      try {
        return await api.post(`/spectrum/stream/domain`, data);
      } catch (error) {
        console.log(error);

        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },

    async get_domain() {
      try {
        const { data } = await api.get(`/domain/domain`);
        this.domain_list = data;
      } catch (error) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async postStream(data: Create) {
      console.log(data);

      try {
        if (
          (data.name === "", data.deal_id === null, data.countries.length === 0)
        ) {
          useError(
            "Error: Что то пошло не так с сервером, знаете куда писать)"
          );
          return;
        }
        return await api.post(`/spectrum/stream`, data);
      } catch (error) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },

    async getStream(offset: number, limit: number, search: any = null) {
      try {
        const params = new URLSearchParams(search).toString();

        const { data } = await api.get(
          `/spectrum/stream/${offset}/${limit}?${
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
    async update_stream(offset: number, limit: number, search: any = null) {
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
    getById(id: number) {
      return this.rows.find((e) => (e.id === id ? true : false));
    },
    async deleteStream(id: number) {
      try {
        this.rows = this.rows.filter((e) => (e.id === id ? false : true));
        return await api.delete(`/spectrum/stream/${id}`);
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async deleteDomain(search: any) {
      try {
        const params = new URLSearchParams(search).toString();
        return await api.delete(`/spectrum/stream/domain?${params}`);
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    setFilter(offset: number = 1, limit: number = 10, data: any) {
      this.getStream(offset, limit, data);
      const notyf = useNotyf();
      notyf.success("Фильтр применен");
    },
    // setStat(data: any) {
    //   this.stat = data;
    // },
  },
});
