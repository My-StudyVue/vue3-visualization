<template>
  <div class="box" :style="{ background: `url(${bg})` }">
    <div class="box-left"></div>
    <div class="box-center" id="china" ref="china"></div>
    <div class="box-right"></div>
  </div>
</template>

<script setup lang="ts">
import bg from "@/assets/bg.png";
import { useStore } from "@/stores/index";
import { onMounted } from "vue";
import "assets/js/china";
import { geoCoordMap } from "@/assets/ts/geoMap";

// import echarts from 'echarts' //v4
// import * as echarts from 'echarts' //v5

const store = useStore();

onMounted(async () => {
  await store.getList();

  initCharts();
});

const initCharts = () => {
  const province = store.list.diseaseh5Shelf.areaTree[0].children;
  const data = province.map((v) => ({
    name: v.name,
    value: geoCoordMap[v.name].concat(v.total.nowConfirm),
  }));
  console.log(province, "==province");
  const charts = (window as any).echarts.init(
    document.querySelector("#china") as HTMLElement
  );

  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        //  normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            //normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            //},
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2];
          },
        },
        itemStyle: {
          color: "#1E90FF", //标志颜色
        },
        data: data,
      },
    ],
  });
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

.box {
  height: 100%;
  display: flex;
  overflow: hidden;

  &-left {
    width: 400px;
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 400px;
  }
}
</style>
