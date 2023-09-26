import { defineStore } from "pinia";
import api from "../api";
import { useError } from "../composable/useError";

interface IStatus {
  filter: Array<IFilter>;
}
interface IFilter {
  id: number;
  name: string;
}
export const useStatus = defineStore("status", {
  state: (): IStatus => ({
    filter: [],
  }),
  actions: {
    async getAllStatus() {
      try {
        const res = await api.get(`/spectrum/status`);
        this.filter = res.data;
      } catch {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
  },
});
