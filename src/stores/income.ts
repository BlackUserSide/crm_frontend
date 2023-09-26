import { defineStore } from "pinia";
import api from "../api";
import { useError } from "../composable/useError";

interface State {
  rows: any;
  count: any;
  max_page: number;
  statistic: any;
  activeFilter: boolean;
  showcase: any;
  filter: any;
}

export const useIncome = defineStore("income", {
  state: (): State => ({
    rows: [],
    count: "",
    max_page: 0,
    statistic: [],
    activeFilter: false,
    showcase: [],
    filter: [],
  }),
  actions: {
    async getIncome(offset: number, limit: number, search: any = null) {
      try {
        const params = new URLSearchParams(search).toString();

        const { data } = await api.get(
          `/spectrum/income/${offset}/${limit}?${
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
    async getShowcase(offset: number, limit: number, search: any = null) {
      try {
        const params = new URLSearchParams(search).toString();

        const { data } = await api.get(
          `/spectrum/income/showcase/${offset}/${limit}?${
            params === "null=" ? "" : params
          }`
        );

        this.showcase.rows = data.rows;
        this.showcase.max_page = data.max_page;
        this.showcase.count = data.count;
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    setFilter(offset: number, limit: number, data: any) {
      let o = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v != null)
      );

      this.getIncome(offset, limit, o);

      //this.getShowcase(offset, limit, o);
    },
  },
});
