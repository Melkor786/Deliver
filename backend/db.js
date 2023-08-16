const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://EatsEase:paisa_kamao@cluster0.qkgx5tb.mongodb.net/Gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
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
