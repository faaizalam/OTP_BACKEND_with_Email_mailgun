import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import OTP from '../Model/OTP.js'
import USER from '../Model/User.js'


const OPTfinal=express.Router()

OPTfinal.post('/postman/check',async(req,res)=>{
  const otpfinal=await OTP.findOne().sort({_id:-1}).limit(1)
  console.log(otpfinal)
  if (otpfinal &&(otpfinal.otp===req.body.otp) ) {
    res.send(otpfinal)
    console.log(otpfinal)
    
    
  }
  else{
    res.status(401).send({message:"no"})
  }



})


OPTfinal.put('/postman/password',expressAsyncHandler(async(req,res)=>{
   const ress=await USER.findOne(req.params.id)
   if(ress){
    ress.password=req.body.password||ress.password
    ress.save()
    res.send(ress)
    

   }else{
    res.send({message:"not found"})
    console.log(ress)
   }


}))


export default OPTfinal