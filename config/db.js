const {connect}=require(`mongoose`);
const {LOCAL_MONGODB_URL,CLOUD_MONGODB_URL,NODE_ENV}=require(`./index`);
const {success,error}=require(`consola`);
const colors=require(`colors`);
 exports.dbConnection=async()=>{
     try {
        //  if(NODE_ENV==`development`){
        //      await connect(LOCAL_MONGODB_URL);
        //      success(`Local Connection established`.blue);
             
        //  } else {
        //      await connect(CLOUD_MONGODB_URL);
        //      success(`Cloud Connection established`.blue);
        //  }
        if(NODE_ENV==`development`){
        await connect(CLOUD_MONGODB_URL);
        success(`Cloud Connection established`.blue);
    }
         
     } catch (err) {
         error(err);
     }
 }