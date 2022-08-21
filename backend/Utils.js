// import mg from 'mailgun-js'
import mg from 'mailgun-js'



export const mailgun=(()=>mg({
    apiKey:process.env.MAILGUN_API_KEY,
    domain:process.env.MAILGUN_DOMAIN,
    // host: "api.eu.mailgun.net"
    
    

}))



export const HTmltemplet=((x,otpobj)=>{
    return`
    <h1> hi ${x.email}</h1>
    <p> thanks for verifying your email ${x.email}</p>
    <p> your password is ${x.password}</p>
    <p> your OTP is ${otpobj.otp}</p>
    
    `

})

