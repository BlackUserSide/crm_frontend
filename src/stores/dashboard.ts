import { defineStore } from "pinia";
import api from "../api";
import { useNotyf } from "../composable/useNotyf";
import { useError } from "../composable/useError";
interface State {
  rows: any;
  count: any;
  max_page: number;
  statistic: any;
  activeFilter: boolean;
}
export interface Lead {
  isChecked?: boolean;
  country: string;
  createdAt: string;
  deal_id: number;
  domain: string;
  id: number;
  login: string;
  name_lead: string;
  offer_id: number;
  partner: string;
  phone: string;
  status: string;
  status_id: number;
  sub_id: string;
  updatedAt: string;
  user_id: number;
}
export const useDashboard = defineStore("dashboard", {
  state: (): State => ({
    rows: [],
    count: "",
    max_page: 0,
    statistic: [],
    activeFilter: false,
  }),

  actions: {
    setDataSocket(data: any) {
      this.rows = data.rows;
      this.max_page = data.max_page;
      this.count = data.count;
    },
    async getDashboard(offset: number, limit: number, search: any = null) {
      try {
        const params = new URLSearchParams(search).toString();

        const { data } = await api.get(
          `/spectrum/lead/${offset}/${limit}?${
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
    getStatistic() {
      try {
        api.get("/spectrum/lead/statistic").then(({ data }) => {
          this.statistic = data;
        });
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    setFilter(offset: number = 1, limit: number = 10, data: any) {
      let o = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v != null)
      );
      console.log(o, "o data");

      this.getDashboard(offset, limit, o);
      const notyf = useNotyf();
      notyf.success("Фильтр применен");
    },
    // setStat(data: any) {
    //   this.stat = data;
    // },
  },
});
