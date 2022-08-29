const {Schema,model}=require(`mongoose`);

const ProfileSchema=new Schema({
    username:{
        type:String,
        required:[true,"Please add username"],
        minlength:[6,"username should be minimum 6 characters"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"please add email addresss"],
        match:[/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    phone:{
        type:Number,
        required:[true,"Please add your mobile number"],
    },
    location:{
        type:String,
        required:[true,"Please add your location"],
    },
    genere:{
        type:String,
    },
    photo:{
        type:[""],
        required:true,
        default:["https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1643957071~hmac=37f646674721ff51cbdc4b01e9197166"],

    }
},
{timestamps:true,}
);

module.exports =model("profile",ProfileSchema);


