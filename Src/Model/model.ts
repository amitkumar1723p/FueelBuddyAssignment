
import mongoose from "mongoose";


 const userSchema = new mongoose.Schema({
    name: {type:String ,trim:true ,required:true},
     age :{type:Number,trim:true ,required:true},
     city :{type:String ,trim:true ,required:true}

 })

 export const userModel =mongoose.model('userDetail' ,userSchema)