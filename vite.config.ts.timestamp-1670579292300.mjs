// vite.config.ts
import { defineConfig } from "file:///D:/web/job/dimaRadovitchenko/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/web/job/dimaRadovitchenko/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///D:/web/job/dimaRadovitchenko/node_modules/vite-plugin-pages/dist/index.mjs";
import Components from "file:///D:/web/job/dimaRadovitchenko/node_modules/unplugin-vue-components/dist/vite.mjs";
import { VitePluginFonts } from "file:///D:/web/job/dimaRadovitchenko/node_modules/vite-plugin-fonts/dist/index.js";
var SILENT = Boolean(process.env.SILENT) ?? false;
var SOURCE_MAP = Boolean(process.env.SOURCE_MAP) ?? false;
var vite_config_default = defineConfig({
  root: process.cwd(),
  base: "/",
  logLevel: SILENT ? "error" : "info",
  publicDir: "public",
  resolve: {
    alias: [
      {
        find: "/@src/",
        replacement: `/src/`
      }
    ]
  },
  optimizeDeps: {
    include: [
      "@ckeditor/ckeditor5-vue",
      "@ckeditor/ckeditor5-build-classic",
      "@iconify/iconify",
      "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.min.js",
      "@vueuse/core",
      "@vueuse/head",
      "@vueform/multiselect",
      "@vueform/slider",
      "axios",
      "billboard.js",
      "dayjs",
      "dropzone",
      "dragula",
      "filepond",
      "filepond-plugin-file-validate-size",
      "filepond-plugin-file-validate-type",
      "filepond-plugin-image-exif-orientation",
      "filepond-plugin-image-crop",
      "filepond-plugin-image-edit",
      "filepond-plugin-image-preview",
      "filepond-plugin-image-resize",
      "filepond-plugin-image-transform",
      "imask",
      "nprogress",
      "notyf",
      "mapbox-gl",
      "photoswipe/dist/photoswipe",
      "photoswipe/dist/photoswipe-ui-default",
      "plyr",
      "v-calendar",
      "vee-validate",
      "vue",
      "vue-scrollto",
      "vue3-apexcharts",
      "vue-tippy",
      "simplebar",
      "simple-datatables",
      "tiny-slider/src/tiny-slider",
      "vue-accessible-color-picker",
      "yup"
    ]
  },
  build: {
    minify: false,
    sourcemap: SOURCE_MAP,
    chunkSizeWarningLimit: 2e3,
    rollupOptions: {
      external: [/\/demo\/.*/]
    }
  },
  plugins: [
    vue({ include: [/\.vue$/] }),
    Pages({
      nuxtStyle: false,
      pagesDir: [
        {
          dir: "src/pages",
          baseRoute: ""
        }
      ]
    }),
    Components({
      dirs: ["documentation", "src/components", "src/layouts"],
      extensions: ["vue", "md"],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    }),
    VitePluginFonts({
      google: {
        families: [{ name: "Raleway", styles: "wght@500;600;700;800;900" }]
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3ZWJcXFxcam9iXFxcXGRpbWFSYWRvdml0Y2hlbmtvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3ZWJcXFxcam9iXFxcXGRpbWFSYWRvdml0Y2hlbmtvXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93ZWIvam9iL2RpbWFSYWRvdml0Y2hlbmtvL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBQYWdlcyBmcm9tIFwidml0ZS1wbHVnaW4tcGFnZXNcIjtcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcclxuaW1wb3J0IHsgVml0ZVBsdWdpbkZvbnRzIH0gZnJvbSBcInZpdGUtcGx1Z2luLWZvbnRzXCI7XHJcbmNvbnN0IFNJTEVOVCA9IEJvb2xlYW4ocHJvY2Vzcy5lbnYuU0lMRU5UKSA/PyBmYWxzZTtcclxuY29uc3QgU09VUkNFX01BUCA9IEJvb2xlYW4ocHJvY2Vzcy5lbnYuU09VUkNFX01BUCkgPz8gZmFsc2U7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJvb3Q6IHByb2Nlc3MuY3dkKCksXHJcbiAgYmFzZTogXCIvXCIsXHJcbiAgbG9nTGV2ZWw6IFNJTEVOVCA/IFwiZXJyb3JcIiA6IFwiaW5mb1wiLFxyXG4gIHB1YmxpY0RpcjogXCJwdWJsaWNcIixcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogXCIvQHNyYy9cIixcclxuICAgICAgICByZXBsYWNlbWVudDogYC9zcmMvYCxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGluY2x1ZGU6IFtcclxuICAgICAgXCJAY2tlZGl0b3IvY2tlZGl0b3I1LXZ1ZVwiLFxyXG4gICAgICBcIkBja2VkaXRvci9ja2VkaXRvcjUtYnVpbGQtY2xhc3NpY1wiLFxyXG4gICAgICBcIkBpY29uaWZ5L2ljb25pZnlcIixcclxuICAgICAgXCJAbWFwYm94L21hcGJveC1nbC1nZW9jb2Rlci9kaXN0L21hcGJveC1nbC1nZW9jb2Rlci5taW4uanNcIixcclxuICAgICAgXCJAdnVldXNlL2NvcmVcIixcclxuICAgICAgXCJAdnVldXNlL2hlYWRcIixcclxuICAgICAgXCJAdnVlZm9ybS9tdWx0aXNlbGVjdFwiLFxyXG4gICAgICBcIkB2dWVmb3JtL3NsaWRlclwiLFxyXG4gICAgICBcImF4aW9zXCIsXHJcbiAgICAgIFwiYmlsbGJvYXJkLmpzXCIsXHJcbiAgICAgIFwiZGF5anNcIixcclxuICAgICAgXCJkcm9wem9uZVwiLFxyXG4gICAgICBcImRyYWd1bGFcIixcclxuICAgICAgXCJmaWxlcG9uZFwiLFxyXG4gICAgICBcImZpbGVwb25kLXBsdWdpbi1maWxlLXZhbGlkYXRlLXNpemVcIixcclxuICAgICAgXCJmaWxlcG9uZC1wbHVnaW4tZmlsZS12YWxpZGF0ZS10eXBlXCIsXHJcbiAgICAgIFwiZmlsZXBvbmQtcGx1Z2luLWltYWdlLWV4aWYtb3JpZW50YXRpb25cIixcclxuICAgICAgXCJmaWxlcG9uZC1wbHVnaW4taW1hZ2UtY3JvcFwiLFxyXG4gICAgICBcImZpbGVwb25kLXBsdWdpbi1pbWFnZS1lZGl0XCIsXHJcbiAgICAgIFwiZmlsZXBvbmQtcGx1Z2luLWltYWdlLXByZXZpZXdcIixcclxuICAgICAgXCJmaWxlcG9uZC1wbHVnaW4taW1hZ2UtcmVzaXplXCIsXHJcbiAgICAgIFwiZmlsZXBvbmQtcGx1Z2luLWltYWdlLXRyYW5zZm9ybVwiLFxyXG4gICAgICBcImltYXNrXCIsXHJcbiAgICAgIFwibnByb2dyZXNzXCIsXHJcbiAgICAgIFwibm90eWZcIixcclxuICAgICAgXCJtYXBib3gtZ2xcIixcclxuICAgICAgXCJwaG90b3N3aXBlL2Rpc3QvcGhvdG9zd2lwZVwiLFxyXG4gICAgICBcInBob3Rvc3dpcGUvZGlzdC9waG90b3N3aXBlLXVpLWRlZmF1bHRcIixcclxuICAgICAgXCJwbHlyXCIsXHJcbiAgICAgIFwidi1jYWxlbmRhclwiLFxyXG4gICAgICBcInZlZS12YWxpZGF0ZVwiLFxyXG4gICAgICBcInZ1ZVwiLFxyXG4gICAgICBcInZ1ZS1zY3JvbGx0b1wiLFxyXG4gICAgICBcInZ1ZTMtYXBleGNoYXJ0c1wiLFxyXG4gICAgICBcInZ1ZS10aXBweVwiLFxyXG4gICAgICBcInNpbXBsZWJhclwiLFxyXG4gICAgICBcInNpbXBsZS1kYXRhdGFibGVzXCIsXHJcbiAgICAgIFwidGlueS1zbGlkZXIvc3JjL3Rpbnktc2xpZGVyXCIsXHJcbiAgICAgIFwidnVlLWFjY2Vzc2libGUtY29sb3ItcGlja2VyXCIsXHJcbiAgICAgIFwieXVwXCIsXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG1pbmlmeTogZmFsc2UsXHJcbiAgICBzb3VyY2VtYXA6IFNPVVJDRV9NQVAsXHJcbiAgICAvLyBUdXJuaW5nIG9mZiBicm90bGlTaXplIGRpc3BsYXkgY2FuIHNsaWdodGx5IHJlZHVjZSBwYWNrYWdpbmcgdGltZVxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLFxyXG4gICAgLy8gbWluaWZ5OiB0cnVlLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5jb21tZW50IHRoaXMgc2VjdGlvbiB0byBidWlsZCB0aGUgZGVtbyB3aXRoIG1pc3NpbmcgaW1hZ2VzXHJcbiAgICAgKiBEb24ndCBmb3JnZXQgdG8gcmVtb3ZlIHRoaXMgc2VjdGlvbiB3aGVuIHlvdSByZXBsYWNlZCBhc3NldHMgd2l0aCB5b3Vyc1xyXG4gICAgICovXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbL1xcL2RlbW9cXC8uKi9dLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSh7IGluY2x1ZGU6IFsvXFwudnVlJC9dIH0pLFxyXG4gICAgUGFnZXMoe1xyXG4gICAgICBudXh0U3R5bGU6IGZhbHNlLFxyXG4gICAgICBwYWdlc0RpcjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRpcjogXCJzcmMvcGFnZXNcIixcclxuICAgICAgICAgIGJhc2VSb3V0ZTogXCJcIixcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZGlyczogW1wiZG9jdW1lbnRhdGlvblwiLCBcInNyYy9jb21wb25lbnRzXCIsIFwic3JjL2xheW91dHNcIl0sXHJcbiAgICAgIGV4dGVuc2lvbnM6IFtcInZ1ZVwiLCBcIm1kXCJdLFxyXG4gICAgICBkdHM6IHRydWUsXHJcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXHJcbiAgICB9KSxcclxuICAgIFZpdGVQbHVnaW5Gb250cyh7XHJcbiAgICAgIGdvb2dsZToge1xyXG4gICAgICAgIGZhbWlsaWVzOiBbeyBuYW1lOiBcIlJhbGV3YXlcIiwgc3R5bGVzOiBcIndnaHRANTAwOzYwMDs3MDA7ODAwOzkwMFwiIH1dLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFEsU0FBUyxvQkFBb0I7QUFDM1MsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHVCQUF1QjtBQUNoQyxJQUFNLFNBQVMsUUFBUSxRQUFRLElBQUksTUFBTSxLQUFLO0FBQzlDLElBQU0sYUFBYSxRQUFRLFFBQVEsSUFBSSxVQUFVLEtBQUs7QUFHdEQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTSxRQUFRLElBQUk7QUFBQSxFQUNsQixNQUFNO0FBQUEsRUFDTixVQUFVLFNBQVMsVUFBVTtBQUFBLEVBQzdCLFdBQVc7QUFBQSxFQUNYLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFFWCx1QkFBdUI7QUFBQSxJQU92QixlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsWUFBWTtBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUFBLElBQzNCLE1BQU07QUFBQSxNQUNKLFdBQVc7QUFBQSxNQUNYLFVBQVU7QUFBQSxRQUNSO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxXQUFXO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULE1BQU0sQ0FBQyxpQkFBaUIsa0JBQWtCLGFBQWE7QUFBQSxNQUN2RCxZQUFZLENBQUMsT0FBTyxJQUFJO0FBQUEsTUFDeEIsS0FBSztBQUFBLE1BQ0wsU0FBUyxDQUFDLFVBQVUsY0FBYyxPQUFPO0FBQUEsSUFDM0MsQ0FBQztBQUFBLElBQ0QsZ0JBQWdCO0FBQUEsTUFDZCxRQUFRO0FBQUEsUUFDTixVQUFVLENBQUMsRUFBRSxNQUFNLFdBQVcsUUFBUSwyQkFBMkIsQ0FBQztBQUFBLE1BQ3BFO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
