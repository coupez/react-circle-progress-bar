import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default {
  input: "src/lib/progress.js",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      exports: 'named',
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
    postcss({
      modules: true,
    }),
    terser(),
  ],
  external: ["react", "react-dom", "react-spring"],
};
