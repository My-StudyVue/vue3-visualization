import { defineStore } from "pinia";
import { getApiList } from "@/server";

export const useStore = defineStore({
  id: "visualization",
  state: () => ({
    list: [],
  }),
  actions: {
    async getList() {
      const result = await getApiList();
      console.log(result, "==getList");
    },
  },
});
