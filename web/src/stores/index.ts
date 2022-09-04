import { defineStore } from "pinia";
import { getApiList } from "@/server";
import type {
  RootObject,
  Children,
  ChinaAdd,
  ChinaTotal,
  StatisGradeCityDetail,
} from "./type";

type LetfList = {
  addNum: number;
  totalNum: number;
  title: string;
};

export const useStore = defineStore({
  id: "visualization",
  state: () => ({
    list: <RootObject> {},
    item: <Children[]>[],
    chinaAdd: <ChinaAdd> {},
    chinaTotal: <ChinaTotal> {},

    letfList: <LetfList[]>[],

    cityDetail: <StatisGradeCityDetail> {},
  }),
  actions: {
    async getList() {
      const result = await getApiList();
      this.list = result;
      this.chinaAdd = result.diseaseh5Shelf.chinaAdd;
      this.chinaTotal = result.diseaseh5Shelf.chinaTotal;

      this.getLeftList();

      this.cityDetail = result.statisGradeCityDetail.slice(0, 10);
    },
    getLeftList() {
      this.letfList = [
        {
          addNum: this.chinaAdd.localConfirmH5,
          totalNum: this.chinaTotal.localConfirm,
          title: "本土现有确诊",
        },
        {
          addNum: this.chinaAdd.nowConfirm,
          totalNum: this.chinaTotal.nowConfirm,
          title: "现有确诊",
        },
        {
          addNum: this.chinaAdd.confirm,
          totalNum: this.chinaTotal.confirm,
          title: "累计确诊",
        },
        {
          addNum: this.chinaAdd.noInfect,
          totalNum: this.chinaTotal.noInfect,
          title: "无症状感染者",
        },
        {
          addNum: this.chinaAdd.importedCase,
          totalNum: this.chinaTotal.importedCase,
          title: "境外输入",
        },
        {
          addNum: this.chinaAdd.dead,
          totalNum: this.chinaTotal.dead,
          title: "累计死亡",
        },
      ];
    },
  },
});
