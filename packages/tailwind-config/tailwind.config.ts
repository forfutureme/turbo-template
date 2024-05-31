import type { Config } from "tailwindcss";

// 这里输入公共会使用的扩展
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
    },
  },
  plugins: [],
}
export default config;