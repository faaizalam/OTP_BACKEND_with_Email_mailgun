import express  from "express";
import USER from "../Model/User.js";


const USERROUTER=express.Router()


USERROUTER.post('/postman/newuser',async(req,res)=>{

    let data ={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,

    }

    const newres= new USER(data)
    const resss = await newres.save()
    res.send(resss)
    
    console.log(resss)

})









export default USERROUTER