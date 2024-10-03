import mongoose from "mongoose";
const applicationSchema= new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },
    
},{timestamps:true});

// samjo timestamps true likhne se it will create two field which are createdAt and updatedAt...

export const Application=mongoose.model('Application', applicationSchema);