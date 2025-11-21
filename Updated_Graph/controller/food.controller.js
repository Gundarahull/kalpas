const { foods } = require("../data/data");

const getFood = (id) => {
  for (let i = 0; i < foods.length; i++) {
    if (foods[i].id == id) {
      return foods[i];
    }
  }
  return null;
};

module.exports = {
  getFood,
};
