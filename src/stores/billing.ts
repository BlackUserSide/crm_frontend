import { useFilter } from "./filter";
import nProgress from "nprogress";
import { defineStore } from "pinia";
import api from "../api";
import { useError } from "../composable/useError";
import { useMoment } from "../composable/useMoment";
interface ITopLineBilling {
  cpl: number;
  cpa: number;
  salary: number;
  billing: number;
  expenses: number;
  all_expenses: number;
  profit: number;
  hold: string;
  salary_team: string;
  hold_revert: string;
}
interface IDataBilling {
  amount: number;
  count: number;
  count_approve: number;
  cpa: number;
  cpa_expense: number;
  cpl: number;
  cpl_expense: number;
  expense: number;
  login: string;
  salary: number;
  salary_expense: number;
}
interface IHistoryBilling {
  amount: number;
  date: string;
  id: number;
  login: string;
}
interface IExpenses {
  id: number;
  comment: string;
  amount: number;
  login: string;
  quantity: number;
  date: string;
}
export interface IUsers {
  id: number;
  login: string;
}
interface State {
  topLine: ITopLineBilling | null;
  dataBilling: any;
  dataHistoryBilling: IHistoryBilling[];
  dataExpenses: any;
  activeFilter: boolean;
  billingUser: IUsers[];
}
export const useBilling = defineStore("billing", {
  state: (): State => ({
    activeFilter: false,
    topLine: null,
    dataBilling: {},
    dataHistoryBilling: [],
    dataExpenses: {},
    billingUser: [],
  }),
  actions: {
    async getStatData(search: any = null) {
      try {
        const params = new URLSearchParams(search).toString();

        const res = await api.get(
          `/spectrum/billing/statistic?${params === "null=" ? "" : params}`
        );
        this.topLine = res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getDataBilling(offset: number, limit: number, search: any = null) {
      const filterStore = useFilter();
      const data = filterStore.dataFilter;
      try {
        const params = new URLSearchParams(search).toString();
        const res = await api.get(
          `/spectrum/billing/${offset}/${limit}?${
            params === "null=" ? "" : params
          }`
        );
        this.dataBilling = res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getDataBillingHistory(
      offset: number,
      limit: number,
      search: any = null
    ) {
      const filterStore = useFilter();
      const data = filterStore.dataFilter;
      try {
        const params = new URLSearchParams(search).toString();
        const res = await api.get(
          `/spectrum/billing/history/${offset}/${limit}?${
            params === "null=" ? "" : params
          }`
        );
        this.dataHistoryBilling = res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getDataBillingExpenses(
      offset: number,
      limit: number,
      search: any = null
    ) {
      const filterStore = useFilter();
      const data = filterStore.dataFilter;
      try {
        const params = new URLSearchParams(search).toString();
        const res = await api.get(
          `/spectrum/expense/${offset}/${limit}?${
            params === "null=" ? "" : params
          }`
        );
        console.log(res.data);

        this.dataExpenses = res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getDataBillingUser() {
      try {
        const res = await api.get("/spectrum/users");
        this.billingUser = res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async sendDataModalFirst(data: any) {
      console.log(data);

      const dataSend = {
        user_id: +data.user,
        comment: data.comment,
        quantity: +data.quantity,
        amount: +data.amount,
        date: useMoment(data.date, "patched_time"),
      };
      try {
        const res = await api.post("/spectrum/billing/expense", dataSend);
        return res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async sendModalSecond(data: any) {
      try {
        console.log(data);
        const request_data = {
          user_id: data.userId,
          amount: data.amount,
          date: useMoment(data.date, "patched_time"),
        };
        const res = await api.post("/spectrum/billing/showcase", request_data);
        return res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    setFilter(offset: number, limit: number, data: any) {
      let o = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v != null)
      );

      this.getStatData(o);
      this.getDataBilling(offset, limit, o);
      this.getDataBillingHistory(offset, limit, o);
      this.getDataBillingExpenses(offset, limit, o);
    },
    async deleteBilling(id: number) {
      try {
        const res = await api.delete(`/spectrum/billing/${id}`);

        return res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async deleteExpense(id: number) {
      try {
        const res = await api.delete(`/spectrum/expense/${id}`);

        return res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
  },
});
