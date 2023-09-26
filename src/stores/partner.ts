import { defineStore } from "pinia";
import api from "../api";
import { useNotyf } from "../composable/useNotyf";
import { useError } from "../composable/useError";
import { Lead } from "./dashboard";
interface State {
  rows: any;
  count: any;
  max_page: number;
  create: Create;
  all_partner: Partner[];
}

interface Create {
  name: string;
  platform: string;
  partner_url: string;
  token: string;
  params: any;
}

interface ReRegistration {
  upload_data: {
    partner_id: number | null;
    deal_id: number | null;
  };
  leads: Array<number>;
}

interface Partner {
  id: number;
  name: string;
}

export const usePartner = defineStore("partner", {
  state: (): State => ({
    rows: [],
    count: "",
    max_page: 0,
    create: {
      name: "",
      platform: "",
      partner_url: "",
      token: "",
      params: "",
    },
    all_partner: [],
  }),

  actions: {
    setData(data: any) {
      this.rows = data.rows;
      this.max_page = data.max_page;
      this.count = data.count;
    },
    async postPartner(data: Create) {
      try {
        if (data.name === "") return useError("Empty name!!!");
        if (data.platform === "") return useError("Empty platform!!!");
        if (data.partner_url === "") return useError("Empty partner_url!!!");
        if (data.token === "") return useError("Empty token!!!");
        if (data.params === "") return useError("Empty params!!!");
        data.params = data.params
          .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
          .replace(/:\s*([a-zA-Z0-9_]+)/g, ':"$1"');

        return await api.post(`/partner/post`, data);
      } catch (error) {
        console.log(error);

        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async postReRegistration(data: ReRegistration) {
      if (!data.upload_data.deal_id) return useError("Partner Must be Select");
      let o = Object.fromEntries(
        Object.entries(data.upload_data).filter(([_, v]) => v != null)
      );
      try {
        return await api.post(`/spectrum/post`, {
          leads: data.leads,
          upload_data: { ...o },
        });
      } catch (error) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async getPartner(offset: number, limit: number, search: any = null) {
      try {
        console.log(search, "search");
        const params = new URLSearchParams(search).toString();

        const { data } = await api.get(
          `/partner/get/${offset}/${limit}?${params === "null=" ? "" : params}`
        );

        this.rows = data.rows;
        this.max_page = data.max_page;
        this.count = data.count;
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },

    async getAllPartner() {
      try {
        const { data } = await api.get(`/partner/get`);

        this.all_partner = data;
      } catch (err) {
        useError("Error: Что то пошло не так с сервером, знаете куда писать)");
      }
    },
    async update_partner(offset: number, limit: number, search: any = null) {
      try {
        const params = new URLSearchParams(search).toString();

        const { data } = await api.get(
          `/partner/update/${offset}/${limit}?${
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
      return this.rows.find((e: any) => (e.id === id ? true : false));
    },
    async deletePartner(id: number) {
      try {
        this.rows = this.rows.filter((e: any) => (e.id === id ? false : true));
        return await api.delete(`/partner/delete/${id}`);
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
