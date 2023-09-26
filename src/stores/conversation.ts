import { useFilter } from "./filter";
import { defineStore } from "pinia";
import api from "../api";
import { useError } from "../composable/useError";
import { useNotyf } from "../composable/useNotyf";
interface State {
  conversation: any;
  conversationSecond: any;
  activeFilter: boolean;
  conversationGeo: any;
  conversationPartner: any;
  periud: any;
}
export const useConversation = defineStore("conversation", {
  state: (): State => ({
    conversation: [],
    conversationSecond: [],
    conversationGeo: [],
    conversationPartner: [],
    activeFilter: false,
    periud: null,
  }),
  actions: {
    async getConversation(offset: number, limit: number, search: any = null) {
      const params = new URLSearchParams(search).toString();
      try {
        const res = await api.get(
          `/spectrum/conversation/${offset}/${limit}?${
            params === "null=" ? "" : params
          }`
        );
        this.conversation = res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getDataSecond(offset: number, limit: number, search: any = null) {
      const params = new URLSearchParams(search).toString();
      try {
        const res = await api.get(
          `/spectrum/conversation/offer/${offset}/${limit}?${
            params === "null=" ? "" : params
          }`
        );
        this.conversationSecond = res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getGeo(offset: number, limit: number, search: any = null) {
      const params = new URLSearchParams(search).toString();
      try {
        const res = await api.get(
          `/spectrum/conversation/geo/${offset}/${limit}?${
            params === "null=" ? "" : params
          }`
        );
        this.conversationGeo = res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getPartenr(offset: number, limit: number, search: any = null) {
      const params = new URLSearchParams(search).toString();
      try {
        const res = await api.get(
          `/spectrum/conversation/partner/${offset}/${limit}?${
            params === "null=" ? "" : params
          }`
        );
        this.conversationPartner = res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    setFilter(offset: number = 1, limit: number = 10, data: any) {
      let filter_data = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v != null)
      );

      this.getConversation(offset, limit, filter_data);
      this.getDataSecond(offset, limit, filter_data);
      this.getGeo(offset, limit, filter_data);
      this.getPartenr(offset, limit, filter_data);
      const notyf = useNotyf();
      notyf.success("Фильтр применен");
      // this.conversation = data.conversion;
      // this.conversationSecond = data.offers;
    },
  },
});
