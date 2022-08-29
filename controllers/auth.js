const AuthSchema = require(`../model/Auth`);
const{success, error}=require(`consola`);
const bcrypt=require(`bcryptjs`);
const {JWT_COOKIE_EXPIRE}=require(`../config/index`);
const{authontification}=require("../helper/validator")

/*
@ACCESS PUBLIC
@HTTP REQUEST POST
@URL api/auth/signup
 */

exports.Signup = async(req, res) =>{
    try {
        let{username,email,password,role}=req.body;
        await authontification.validateAsync(req.body);
        const preuser= await AuthSchema.findOne({email});
        if(preuser){
            
            return res.status(401).json({message:"email is already inuse...!!!"})
        }
        let userData=new AuthSchema({
            username,
            email,
            password,
            role
        });
        let user=await AuthSchema.create(userData);
        sendtoken(user,201,res);
        
    } catch (err) {
        // next(errorhandling(error,req,res,next))
        res.status(501).json({message:"something went wrong while signup"})
    }
}
/*
@Access public
@http request post
@URL api/auth/signin
*/
exports.Signin=async(req,res)=>{
    try {
        let {email,password}=req.body;
        await authontification.validateAsync(req.body);
        let user=await AuthSchema.findOne({email}).select("+password");
        //check existing user
        if(!user){
            
            res.status(401).json({message:"email is not exist in our system"})
        }
        //!check password ...............not working properly
        let match=await bcrypt.compare(password,user.password);
        if(!match){
         
            res.status(401).json({message:"password is not matched"});
        }
        sendtoken(user,201,res);

         
    } catch (err) {
        return res.status(501).json({message:`SERVER NOT WORKING PROPERLY FOR SIGNIN `,})
    }
}



function sendtoken (user,statuscode,res){
   token=user.gettoken();
    const options={
        expires:new Date(Date.now()+JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    }
    res.status(statuscode).cookie("TOKEN",token,options).json({message:`token is created successfully`,token})
}

exports.getuser= async (req, res, next) => {
    try {
        let user= await AuthSchema.findById(req.user.id);
        res.status(200).json({message:"Successfully fetched",user});
        
    } catch (err) {
        res.status(500).json({message:"SERVER ERROR NOT GETTING USER"});
    }
}