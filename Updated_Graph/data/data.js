const restaurants = [
  { id: 1, name: "Rahul’s Tasty Hub", location: "Hyderabad", minRating: 5.0 },
  { id: 2, name: "Spicy Andhra Mess", location: "Vijayawada", minRating: 4.5 },
];

const foods = [
  {
    id: 1,
    name: "Biryani",
    price: 150,
    category: "Rice",
    rating: 4.5,
    restaurantId: 1,
  },
  {
    id: 2,
    name: "Dosa",
    price: 60,
    category: "South",
    rating: 5.0,
    restaurantId: 1,
  },
  {
    id: 3,
    name: "Meals",
    price: 100,
    category: "South",
    rating: 4.2,
    restaurantId: 2,
  },
];

const Ingredients = [
  {
    id: 1,
    name: "Biryani Leaf",
    localName: "BiryaniAKKU",
    foodId: 1,
  },
  {
    id: 2,
    name: "Jaggery",
    localName: "Bellam",
    foodId: 1,
  },
  {
    id: 3,
    name: "HotMasala",
    localName: "garamMAsala",
    foodId: 2,
  },
];

module.exports = { restaurants, foods,Ingredients };
