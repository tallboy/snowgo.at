module.exports = {
  locals: {
    goats: require("./goats.js"),
    slugify: (str) => str.toLowerCase().trim().replaceAll(/\W+/g, "-"),
  },
};
