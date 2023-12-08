import express from "express";
import dotenv from "dotenv";
import  connection from "./databse/connection.js"
import cors from 'cors';
import route from './routes/route.js'
const app = express();

dotenv.config();
app.use(express.json());


app.use(cors()); 
app.use('/', route);
const PORT = process.env.PORT || 3002;
app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
})
connection();