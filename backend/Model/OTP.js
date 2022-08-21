import mongoose  from "mongoose";




const OTPSchme=new mongoose.Schema({
 otp:{type:Number,required:true},
 email:{type:String ,required:true},
 date:{
    type:Date,
    default:Date.now()
 }

})

const OTP=mongoose.model('OTP',OTPSchme)
export default OTP
