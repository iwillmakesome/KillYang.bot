const { build } = require("esbuild");

build({
  entryPoints: ["index.js"],
  bundle: true,
  outfile: "./dist/bot.js",
  platform: "node",
});
