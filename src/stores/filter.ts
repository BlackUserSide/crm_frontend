import { useDashboard } from "./dashboard";
import { useBilling } from "./billing";
import { useConversation } from "./conversation";
import { defineStore } from "pinia";
import api from "../api";
import { useError } from "../composable/useError";
import { useMoment } from "../composable/useMoment";
import { useStream } from "./stream";
import { useIncome } from "./income";

interface State {
  offset: number;
  limit: number;
  timeFilterActive: null | string;
  current_period: string;
  type: null | string;
  select_filter: null | Array<string>;
  activeFilter: null | string;
  dataFilter: any;
  active_periud: any;
  period_filter: boolean;
  period_router: string;
}
export const useFilter = defineStore("filter", {
  state: (): State => ({
    offset: 1,
    limit: 10,
    timeFilterActive: "",
    current_period: "today",
    type: null,
    period_filter: false,
    period_router: "app",
    activeFilter: null,
    select_filter: [],
    active_periud: "",
    dataFilter: {
      user_id: null,
      end_date: null,
      start_date: null,
      domain: null,
      deal_id: null,
      status_id: null,
      partner: null,
      sub_id: null,
      utm_medium: null,
      utm_campaign: null,
    },
  }),
  actions: {
    setPeriod(period: string) {
      this.current_period = period;
    },
    setActiveFilter(filter: string, type: string) {
      this.type = type ? type : "app";
      this.timeFilterActive = filter;
      this.period_router = this.type;
      console.log(filter, type);

      let store: any = useDashboard();
      switch (type) {
        case "conversation":
          store = useConversation();
          break;
      }
      this.period_filter = true;
      store.setFilter(this.offset, this.limit, this.timeFilterActive);
    },
    setActiveFilterWrap(filter: string, type: string) {
      this.type = type ? type : "app";
      this.activeFilter = filter;
      console.log(this.activeFilter, "filter", type);
    },
    async setData(data: any) {
      for (let key in data) {
        if (key === "start" || key === "end") {
          this.dataFilter[key + "_date"] = useMoment(data[key], "full_time");
          continue;
        }

        this.dataFilter[key] = data[key];
      }
      let store: any = null;
      switch (this.type) {
        case "conversation":
          store = useConversation();
          break;
        case "billing":
          store = useBilling();
          break;
        case "stream":
          store = useStream();
          break;
        case "income":
          store = useIncome();
          break;
        default:
          store = useDashboard();
          break;
      }
      try {
        let o = Object.fromEntries(
          Object.entries(this.dataFilter).filter(([_, v]) => v != null)
        );

        store.activeFilter! = true;
        store?.setFilter(this.offset, this.limit, o);
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async filterBayer(key: string, array: any[]) {
      let store: any = null;
      switch (this.type) {
        case "conversation":
          store = useConversation();
          break;
        case "billing":
          store = useBilling();
          break;
        case "stream":
          store = useStream();
          break;
        case "income":
          store = useIncome();
          break;
        default:
          store = useDashboard();
          break;
      }
      try {
        store.activeFilter! = true;

        if (typeof array === "string") this.dataFilter[key] = array;
        else this.dataFilter[key] = array.join(",");

        let o = Object.fromEntries(
          Object.entries(this.dataFilter).filter(
            ([_, v]) => v != null && v != ""
          )
        );

        store?.setFilter(this.offset, this.limit, o);

        if (typeof array !== "string")
          this.dataFilter[key] = this.dataFilter[key].split(",");
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    clearFilter() {
      this.activeFilter = null;
    },
  },
});
