<!--  -->
<template>
  <div class="box" :style="{ background: `url(${bg})` }">
    <div class="box-left"></div>
    <div class="box-center"></div>
    <div class="box-right"></div>
  </div>
</template>

<script setup lang="ts">
import bg from "@/assets/bg.png";
import { useStore } from "@/stores/index";

const store = useStore();
store.getList();
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
