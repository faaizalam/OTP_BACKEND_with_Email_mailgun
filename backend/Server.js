import express from 'express'
import dotenv from 'dotenv'
import { HTmltemplet, mailgun } from './Utils.js'
import cors from 'cors'

import mongoose  from 'mongoose'
import USERROUTER from './Router/Userrouter.js'
import USER from './Model/User.js'
import OTP from './Model/OTP.js'
import OPTfinal from './Router/OTPVERIFY.js'
import expressAsyncHandler from 'express-async-handler'



const app=express()
app.use(express.json())

app.use(express.urlencoded({extended:true}))
dotenv.config();
app.use(cors())
try {
  mongoose.connect('mongodb://localhost/otp'||process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
  console.log("working")
  
} catch (error) {
  console.log(err)
  
}
  
  


app.use('/',USERROUTER)
app.use('/',OPTfinal)


app.use((err,req,res,next)=>{
  res.status(201).send({message:err.message})

})


const email="usamaalam1999@gmail.com"
const password='faaizalam'
 // res.send('hello')
  // const obj={

  //     email:req.body.email,
  //     password:req.body.password,

  // }
app.post('/postman/req',expressAsyncHandler(async(req,res)=>{
   
  const resss= await USER.findOne({email:req.body.email})
  const Randomotp=((num1,num2)=>{

   return Math.random() * (num1 - num2)+num2

  })
  
  const OTPs=Randomotp(11111,99999).toFixed(0)
  // console.log(OTPs)
  if (resss) {
    const newotp= new OTP({
      otp:OTPs,
      email:req.body.email
    })
   const  resopt =  await newotp.save()
    
    res.send({resss,resopt})
  
    
  
const data={
    from:' faaiz company <usamaalam1999@gmail.com> ',
    to:'usamaalam1999@gmail.com',
    subject:"updating",
    html:HTmltemplet(resss,resopt)
    
}
try {
  
  mailgun().messages().send(data,(err,body)=>{
    if(err){
        console.log(err)
        // HTmltemplet(obj)
        // console.log(HTmltemplet(obj))
    }else{
        console.log(body)
        // console.log(HTmltemplet(resss))
        
    }
  
  })
} catch (error) {
  console.log(error)
  
}



  }else{
    res.status(401).send({message:"user invalid"})
  }
  

})
)










app.listen(5000||process.env.PORT,()=>{
    console.log(`http://localhost:5000`)

})