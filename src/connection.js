import mongoose from "mongoose";
// import env from "dotenv";
import colors from "colors";

// const uri = process.env.MONGO_URI;
const uri = 'mongodb://localhost:27017';
// const uri = 'mongodb+srv://kaushalmohar777:Ls0Xy3PLSVlKpOyF@safe-n-simple.aveq3dj.mongodb.net/?retryWrites=true&w=majority';

async function connectDB() {

  try {
    await mongoose.connect(uri, {
      dbName: "practice",
      serverSelectionTimeoutMS: 30000,
    });

    mongoose.connection.on("connected", () => {
      console.log("Connected to DB");
    });

    mongoose.connection.on("error", (error) => {
      console.log("Something is wrong in MongoDB", error);
    });

    console.log(`MongoDB Connected: ${mongoose.connection.host}`.bgBlue.white);
  } catch (error) {
    console.log("Error:", error);
  }
}

export default connectDB;
