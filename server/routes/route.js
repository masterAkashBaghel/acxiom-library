import express from "express"
import {signupcontroller,LogInUsers} from "../controller/UserCont.js"
import { addBook,getAllBooks,deleteBook,editBook } from "../controller/BooksCont.js";
import {issuebook,getIssued,deleteIssued} from '../controller/IssuedCont.js'
const route = express.Router();


route.post('/signup',signupcontroller)
route.post('/login',LogInUsers)
route.post('/addbook',addBook)
route.get('/getAllBooks',getAllBooks)
route.delete('/delete/:id',deleteBook)
route.post('/issuebook',issuebook)
route.get('/issue',getIssued)
route.delete('/deleteIssued/:id',deleteIssued)
route.put('/editBook/:id',editBook)









export default route;