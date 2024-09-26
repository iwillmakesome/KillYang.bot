const { build } = require("esbuild");

build({
  entryPoints: ["index.js"],
  bundle: true,
  outfile: "./dist/bot.js",
  platform: "node",
  external: ["sqlite3"], // 네이티브 모듈을 외부로 처리
}).catch(() => process.exit(1));
