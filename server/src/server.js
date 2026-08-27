require('dotenv').config()
const express=require('express'),cors=require('cors'),http=require('http'),{Server}=require('socket.io')
const connect=require('./config/db');const app=express();const server=http.createServer(app)
const io=new Server(server,{cors:{origin:process.env.CLIENT_URL||'http://localhost:5173'}});app.set('io',io)
app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));app.use(express.json({limit:'1mb'}))
app.get('/api/health',(req,res)=>res.json({success:true,message:'InternSphere API is running',time:new Date().toISOString()}))
app.use('/api/auth',require('./routes/auth'));app.use('/api/internships',require('./routes/internships'));app.use('/api/applications',require('./routes/applications'))
const port=process.env.PORT||5000
connect().then(()=>server.listen(port,()=>console.log(`API running on http://localhost:${port}`))).catch(e=>{console.error(e);process.exit(1)})
