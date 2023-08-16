const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, { useNewUrlParser: true });
    console.log("MongoDB Connected successfully");

    const db = mongoose.connection;

    const foodItemsCollection = db.collection("food_items");
    const foodCategoryCollection = db.collection("foodCategory");

    const data = await foodItemsCollection.find({}).toArray();
    const catData = await foodCategoryCollection.find({}).toArray();

    global.food_items = data;
    global.foodCategory = catData;

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
