const mongoose=require('mongoose')
module.exports=mongoose.model('Application',new mongoose.Schema({
 student:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
 internship:{type:mongoose.Schema.Types.ObjectId,ref:'Internship',required:true},
 status:{type:String,enum:['applied','shortlisted','rejected','accepted'],default:'applied'}
},{timestamps:true}))
