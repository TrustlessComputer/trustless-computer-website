import alias from "@rollup/plugin-alias";
import react from "@vitejs/plugin-react";
import * as path from "path";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
/**
 * Replace env variables in index.html
 * @see https://github.com/vitejs/vite/issues/3105#issuecomment-939703781
 * @see https://vitejs.dev/guide/api-plugin.html#transformindexhtml
 */
function htmlPlugin(env: ReturnType<typeof loadEnv>) {
  return {
    name: "html-transform",
    transformIndexHtml: {
      enforce: "pre" as const,
      transform: (html: string): string =>
        html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match),
    },
  };
}

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "REACT_");
  const version = new Date().getTime();

  return defineConfig({
    server: {
      port: 3000,
    },
    plugins: [alias(), react(), htmlPlugin(env)],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
        {
          find: "lib",
          replacement: path.resolve(__dirname, "src/lib"),
        },
        {
          find: "utils",
          replacement: path.resolve(__dirname, "src/lib/utils"),
        },
      ],
      // alias: {
      //   src: path.resolve(__dirname, "src"),
      //   lib: path.resolve(__dirname, "src/lib"),
      //   routes: path.resolve(__dirname, "src/lib/routes"),
      //   utils: path.resolve(__dirname, "./src/lib/utils"),
      //   stream: "stream-browserify",
      //   http: "http-browserify",
      //   https: "https-browserify",
      //   crypto: "crypto-js",
      //   fs: require.resolve("rollup-plugin-node-builtins"),
      //   web3: path.resolve(__dirname, "./node_modules/web3/dist/web3.min.js"),
      // },
    },
    define: {
      "process.env.NODE_DEBUG": JSON.stringify(""),
      DOT_ENV: env,
      __CLIENT__: true,
    },
    build: {
      outDir: `./dist${env.REACT_BASE_PATH}/`,
      assetsDir: `.${env.REACT_BASE_PATH}/assets/`,
      rollupOptions: {
        plugins: [nodePolyfills()],
        output: {
          manualChunks(id) {
            if (id.includes("moment")) return "moment";
            if (id.includes("lodash")) return "lodash";
            if (id.includes("axios")) return "axios";
            if (id.includes("node_modules")) return `vendor_${version}`;
          },
        },
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  });
};
