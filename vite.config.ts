import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import { VitePluginFonts } from "vite-plugin-fonts";
const SILENT = Boolean(process.env.SILENT) ?? false;
const SOURCE_MAP = Boolean(process.env.SOURCE_MAP) ?? false;

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base: "/",
  logLevel: SILENT ? "error" : "info",
  publicDir: "public",
  resolve: {
    alias: [
      {
        find: "/@src/",
        replacement: `/src/`,
      },
    ],
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
      "yup",
    ],
  },
  build: {
    minify: false,
    sourcemap: SOURCE_MAP,
    // Turning off brotliSize display can slightly reduce packaging time
    chunkSizeWarningLimit: 2000,
    // minify: true,

    /**
     * Uncomment this section to build the demo with missing images
     * Don't forget to remove this section when you replaced assets with yours
     */
    rollupOptions: {
      external: [/\/demo\/.*/],
    },
  },
  plugins: [
    vue({ include: [/\.vue$/] }),
    Pages({
      nuxtStyle: false,
      pagesDir: [
        {
          dir: "src/pages",
          baseRoute: "",
        },
      ],
    }),
    Components({
      dirs: ["documentation", "src/components", "src/layouts"],
      extensions: ["vue", "md"],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    VitePluginFonts({
      google: {
        families: [{ name: "Raleway", styles: "wght@500;600;700;800;900" }],
      },
    }),
  ],
});
