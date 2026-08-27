const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{try{const h=req.headers.authorization||'';if(!h.startsWith('Bearer '))throw new Error();req.user=jwt.verify(h.slice(7),process.env.JWT_SECRET);next()}catch(e){res.status(401).json({success:false,message:'Authentication required'})}}
