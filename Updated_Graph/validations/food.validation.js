const yup = require("yup");

const foodSchema = yup.object({
  name: yup
    .string()
    .required("Food name is required")
    .min(2, "Food name must be at least 2 characters long"),

  category: yup
    .string()
    .required("Food category is required"),

  rating: yup
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),

  price: yup
    .number()
    .required("Price is required")
    .min(1, "Price must be a positive number"),


});

module.exports = foodSchema;
