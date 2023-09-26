import { defineStore } from "pinia";
import api from "../api";
import { useError } from "../composable/useError";
interface State {
  domains: any;
  statDomain: any;
  count: number;
  domainsUser: any;
  blacks: any;
  whites: any;
  type: any;
  max_page: any;
  statistic: any;
  rows: any;
}

export const useDomains = defineStore("domain", {
  state: (): State => ({
    domains: [],
    statDomain: [],
    domainsUser: [],
    blacks: [],
    whites: [],
    type: "",
    rows: [],
    count: 0,
    max_page: 0,
    statistic: [],
  }),
  actions: {
    async get(offset: number, limit: number, search_parmas: any = null) {
      try {
        const { data } = await api.get(`/domain/domain/${offset}/${limit}`);

        this.count = data.count;
        this.max_page = data.max_page;
        this.rows = data.rows;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async get_statistic(
      offset: number,
      limit: number,
      search_parmas: any = null
    ) {
      try {
        const { data } = await api.get(`/domain/domain/statistic`);

        this.statistic = data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async pushDomains(data: any) {
      try {
        const rest = await api.post("/domain/domain", data);

        return rest;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async update(data: any) {
      try {
        const rest = await api.patch("/domain/domain/set", data);

        return rest;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    // async pushBayers(data: any) {
    //   try {
    //     const rest = await api.post("/domain/post_count_domain", data);
    //     this.getCountNumber();

    //     return rest;
    //   } catch {
    //     useError("Error: Что то пошло не так с сервером, знаете куда писать)");
    //   }
    // },
  },
});
