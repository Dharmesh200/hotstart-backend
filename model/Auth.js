const {Schema,model}=require(`mongoose`);
const bcrypt=require(`bcryptjs`);
const jwt=require(`jsonwebtoken`);
const{JWT_SECRET,JWT_EXPIRE}=require(`../config/index`)

const AuthSchema=new Schema({
    username:{
        type:String,
        required:true,
        
    },
    email: {
        type:String,
        unique:true,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    role: {
        type:String,
        enum:["user","publisher"],
        default:"user",
    },
},
{timestamps:true}
);

AuthSchema.pre("save",async function(){
    let salt=await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
})

AuthSchema.methods.gettoken=function(){
    return jwt.sign({_id:this.id},JWT_SECRET,{
        expiresIn:JWT_EXPIRE,
    })
}

module.exports=model(`user`,AuthSchema);
