import { defineStore } from "pinia";
import { getApiList } from "@/server";
import type { RootObject } from "./type";

export const useStore = defineStore({
  id: "visualization",
  state: () => ({
    list: <RootObject> {},
  }),
  actions: {
    async getList() {
      const result = await getApiList();
      this.list = result;
      console.log(result, "==getList");
    },
  },
});
