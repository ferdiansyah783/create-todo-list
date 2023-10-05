import mongoose from "mongoose";

let isConncted = false; // variable to track the connection status

export const connectToDB = async () => {
  // set strict query mode for mongoose to prevent unknown field queries
  mongoose.set("strictQuery", true);

  // cek mongodb url
  if (!process.env.MONGODB_URL) return console.log("Missing mongodb url");

  // if the connection is already estabilished, return without create new connection
  if (isConncted) {
    console.log("Mongodb connnection already estabilished");
    return;
  }

  // connect to mongoodb
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConncted = true;
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
