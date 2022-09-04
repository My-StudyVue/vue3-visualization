<template>
  <div class="box" :style="{ background: `url(${bg})` }">
    <div class="box-left" style="color: white">
      <div class="box-left-card">
        <section
          v-for="(leftItem, leftIndex) in store.letfList"
          :key="leftIndex"
        >
          <div>较上日+ {{ leftItem.addNum }}</div>
          <div>{{ leftItem.totalNum }}</div>
          <div>{{ leftItem.title }}</div>
        </section>
      </div>

      <div id="pie" class="box-left-pie"></div>
    </div>

    <div class="box-center" id="china" ref="china"></div>

    <div class="box-right" style="color: white">
      <table border="1" cellspacing="0" class="table">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group
          tag="tbody"
          enter-active-class="animate__animated animate__flipInY"
        >
          <tr v-for="item in store.item" :key="item.name">
            <th align="center">{{ item.name }}</th>
            <th align="center">{{ item.today.confirm }}</th>
            <th align="center">{{ item.total.confirm }}</th>
            <th align="center">{{ item.total.heal }}</th>
            <th align="center">{{ item.total.dead }}</th>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import bg from "@/assets/bg.png";
import { useStore } from "@/stores/index";
import { onMounted } from "vue";
import "assets/js/china";
import { geoCoordMap } from "@/assets/ts/geoMap";
import "animate.css";

// import echarts from 'echarts' //v4
// import * as echarts from 'echarts' //v5

const store = useStore();
let charts: any = null;
let pie: any = null;

onMounted(async () => {
  await store.getList();

  initCharts();
  initPie();
});

const initCharts = () => {
  const province = store.list.diseaseh5Shelf.areaTree[0].children;
  // 默认展示吉林
  store.item = province[9].children;
  const data = province.map((v) => ({
    name: v.name,
    value: geoCoordMap[v.name].concat(v.total.nowConfirm),
    children: v.children,
  }));

  charts = (window as any).echarts.init(
    document.querySelector("#china") as HTMLElement
  );

  const option = {
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
  };

  charts.setOption(option);

  chartsClick();
};

const chartsClick = () => {
  charts.on("click", (e: any) => {
    store.item = e.data.children;
  });
};

const initPie = () => {
  pie = (window as any).echarts.init(
    document.querySelector("#pie") as HTMLElement
  );

  const option = {
    backgroundColor: "#223651",
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 4,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "15",
          },
        },
        data: store.cityDetail.map((v: any) => ({
          name: v.city,
          value: v.nowConfirm,
        })),
      },
    ],
  };
  pie.setOption(option);
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}

@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;

.table {
  width: 100%;
  background: #212028;

  tr {
    th {
      padding: 5px;
      white-space: nowrap;
    }

    td {
      padding: 5px 10px;
      width: 100px;
      white-space: nowrap;
    }
  }
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

    &-card {
      display: grid;
      grid-template-columns: auto auto auto; //表示三列
      grid-template-rows: auto auto; //表示两行

      //也可以用 1fr 2fr 表示宽度是1fr 的两倍
      // grid-template-columns: 1fr 1fr 1fr; //表示三列
      // grid-template-rows: 1fr 1fr; //表示两行

      section {
        background: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:nth-child(2) {
          //选中第二个值
          color: @itemColor;
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }

    &-pie {
      height: 350px;
      margin-top: 20px;
    }
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 400px;
  }
}
</style>
