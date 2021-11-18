// const reactpreview = require("@reactpreview/config");

const loc = path.resolve(__dirname + "/.");
module.exports = {
  publicDir: "src/assets/",
  alias: {
      "@/": "src/"
  },
  vite: {
    resolve: {
      alias: {
        "@/": loc + "/",
        "compassql/": path.resolve(
          __dirname + "/node_modules/compassql/build/compassql.min.js"
        ),
      },
    },
  },
};
