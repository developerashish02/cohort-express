import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URI) ; 
        console.log(`Mongodb is connected ${conn.connection.host}`);
    } catch (error) {
        throw Error(`Error while connecting database:- ${error.message}`)
    }
}

export default connectDB ;