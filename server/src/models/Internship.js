const mongoose=require('mongoose')
const schema=new mongoose.Schema({
 title:{type:String,required:true,trim:true},companyName:{type:String,required:true,trim:true},
 category:{type:String,required:true},location:{type:String,required:true},mode:{type:String,enum:['Remote','Hybrid','On-site'],required:true},
 duration:{type:String,required:true},stipend:{type:String,required:true},openings:{type:Number,required:true,min:1},
 skills:{type:[String],required:true},description:{type:String,required:true,minlength:30},
 eligibility:{type:String,required:true,minlength:10},applicationDeadline:{type:Date,required:true},
 applicationUrl:{type:String,required:true},source:{type:String,default:'InternSphere'},
 externalId:{type:String,index:true,sparse:true},createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{timestamps:true})
schema.index({title:'text',companyName:'text',skills:'text',category:'text'})
module.exports=mongoose.model('Internship',schema)
