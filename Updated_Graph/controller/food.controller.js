const { foods } = require("../data/data");

const getFood = (id) => {
  for (let i = 0; i < foods.length; i++) {
    if (foods[i].id == id) {
      return foods[i];
    }
  }
  return null;
};

const addFood = (data) => {
  const newItem = {
    id: foods.length + 1,
    name: data.name,
    price: data.price,
    category: data.category,
    rating: data.rating,
  };
  foods.push(newItem);
  return foods[foods.length - 1];
};

module.exports = {
  getFood,
  addFood,
};
