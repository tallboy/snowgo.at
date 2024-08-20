import goats from "./goats.js";

export default {
  locals: {
    goats,
    slugify: (str) => str.toLowerCase().trim().replaceAll(/\W+/g, "-"),
  },
};
