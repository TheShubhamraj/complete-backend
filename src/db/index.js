import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
// DB is in another continent
const connectDB = async() =>{
    try{
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected!! DB host:${connectionInstance.connection.host}`);
        //connectionInstance is usually a variable or object that represents a live connection to something external like:

// A database (e.g., MySQL, MongoDB)

// A WebSocket server

// A remote API
        

    }catch(error){
        console.log("MONGODB connection Failed",error);
        process.exit(1)
        
    }
}

export default connectDB