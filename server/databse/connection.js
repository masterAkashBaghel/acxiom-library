import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const connection = async ()=> {

    const url = process.env.DATABASE_URL;
    try{
      await mongoose.connect(url);
      console.log("database connection established")
    } catch(err){
        console.log(`error while connecting to databse ${err.message}`)
    }

}
export default connection;