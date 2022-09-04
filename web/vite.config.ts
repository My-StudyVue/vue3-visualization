import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "echarts": fileURLToPath(
        new URL("./src/assets/js/echarts.min.js", import.meta.url)
      ),
    },
    extensions: [".js", ".vue", ".json", ".ts"], // 引入对应的文件时可以忽略其后缀
  },
  server: {
    // host: true,
    port: 3000,
    strictPort: true,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // proxy: {
    //   "/api": {
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //     changeOrigin: true,
    //     // ws: true,
    //     // target: 'http://127.0.0.1:8182' //后端自己测试

    //     target: "http://47.108.90.157", //正式环境
    //   },
    // },
  },
});
