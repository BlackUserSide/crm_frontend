import { useApi } from "../composable/useApi";

const api = useApi();
export default {
  async get(endpoint: string): Promise<any> {
    try {
      const response = await api.get(endpoint);
      return await response;
    } catch (error) {
      if (!error.data) {
        throw new Error("Api Error");
      } else {
        return error;
      }
    }
  },
  async post(endpoint: string, payload: any): Promise<any> {
    try {
      const response = await api.post(endpoint, payload);

      return response;
    } catch (error) {
      if (!error.data) {
        throw new Error("Api Error");
      } else {
        return error;
      }
    }
  },
  async patch(endpoint: string, payload: any): Promise<any> {
    try {
      console.log(endpoint, "endpoint");

      const response = await api.patch(endpoint, payload);

      return response;
    } catch (error) {
      if (!error.data) {
        throw new Error("Api Error");
      } else {
        return error;
      }
    }
  },
  async delete(endpoint: string): Promise<any> {
    try {
      const response = await api.delete(endpoint);

      return response;
    } catch (error) {
      if (!error.data) {
        throw new Error("Api Error");
      } else {
        return error;
      }
    }
  },
};
