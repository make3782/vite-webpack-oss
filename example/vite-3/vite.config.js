import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginAliOss from "vite-webpack-oss";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
const format = vitePluginAliOss().getFormat();
const options = {
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID, //  Note: Add your accessKeyId
  accessKeySecret: process.env.ACCESS_KEY_SECRET, // Note: Add your accessKeySecret
  bucket: process.env.BUCKET,
  overwrite: false,
  prefix: process.env.PREFIX,
  format,
  limit: 10,
  //test: true,
};

const prod = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  base: prod ? `${process.env.VUE_PUBLIC_PATH}/${format}` : "/", // same with webpack public path
  plugins: [vue(), vitePluginAliOss(options)],
});
// result: dist/assets/vendor.bfb92b77.js => https://foo.com/base/assets/vendor.bfb92b77.js

// export default defineConfig({
//   base: 'https://foo.com/base/', // must be URL
//   plugins: [vue(), vitePluginAliOss(options)],
//   build: {
//     outDir: 'foo'
//   }
// })
// result: foo/assets/vendor.bfb92b77.js => https://foo.com/base/assets/vendor.bfb92b77.js
