const ProfileSchema=require(`../model/Profile`);
const{success,info,error}=require(`consola`);
const{profileAuthentification}=require(`../helper/validator`)

/*
@Access public
@http request post
@URL api/auth/profile
*/


//creating profile in the database=========
exports.Profile= async (req, res) => {    
    try {
        let {username,email,phone,location,genere}=req.body;
        await profileAuthentification.validateAsync(req.body)
        let payload=new ProfileSchema({
            username,
            email,
            phone,
            location,
            genere,
            photo:req.file,
        });
        //save data into database
        let profileData=await ProfileSchema.create(payload);
        
      return res.status(201).json({message:'Successfully profile created',profileData})

        
    } catch (err) {
        error(err);
        res.status(501).json({message:"something wrong"})
        
    }
};

//getting all profile deatails from database

exports.getAllProfile=async (req,res)=>{
    let AllData=await ProfileSchema.find({});
    return res.status(201).json({message:'Successfully all profile data fecthed from database',AllData})
}

//getting profile data by id

exports.getProfile=async (req,res)=>{
    let data=await ProfileSchema.findOne({_id:req.params.id});
    return res.status(201).json({message:'Successfully single profile data fecthed from database',data})
}

//updating profile
exports.updateProfile= async(req,res)=>{
   try{
    let {username,email,phone,location,genere}=req.body;
    let payload=await ProfileSchema.findByIdAndUpdate(
        _id=req.params.id,
        {
            username,
            email,
            phone,
            location,
            genere,
            photo:req.file,
        },
        {new:true}
        );
   
   await  payload.save();
     res.status(201).json({message:'Successfully profile data updated',payload});
   }
   catch(err){
       console.log(err);
       res.status(502).json({message:'Error updating profile'})
   }
}

//deleting profile

exports.deleteProfile = async (req,res)=>{
    let data=await ProfileSchema.findOne({_id:req.params.id});
    data.delete(data);
    res.status(201).json({message:'Successfully profile data deleted'});

}