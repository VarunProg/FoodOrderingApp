import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = () => {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        console.error("MONGO_URI is not defined in your environment variables.");
        process.exit(1);
    }

    mongoose
        .connect(mongoURI)
        .then((con) => {
            console.log(`MongoDB connected: ${con.connection.host}`);
        })
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
};

export default connectDB;