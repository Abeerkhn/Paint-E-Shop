import mongoose from "mongoose";
import colors from "colors";
 const connectDB = async () => {
  try {
    // const conn = await mongoose.connect("process.env.MONGO_URL");
    const conn = await mongoose.connect("mongodb+srv://abeerkn213:je11dHFont7OOuTu@cluster0.jgdzdgb.mongodb.net");
    console.log(
      // `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
      `Conneted To Mongodb Databse ${8080}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
