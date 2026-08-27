import React,{useEffect}from'react'
import {Routes,Route,useLocation,Navigate}from'react-router-dom'
import {io}from'socket.io-client'
import Home from'./pages/Home';import Auth from'./pages/Auth';import Internships from'./pages/Internships';import InternshipDetails from'./pages/InternshipDetails';import Dashboard from'./pages/Dashboard';import PostInternship from'./pages/PostInternship';import {useAuth}from'./context/AuthContext'
function Protected({children}){const{user}=useAuth();return user?children:<Navigate to="/login" replace/>}
function LiveRefresh(){const location=useLocation();useEffect(()=>{const s=io(import.meta.env.VITE_SOCKET_URL||'http://localhost:5000');s.on('internship:created',()=>{window.dispatchEvent(new Event('internship-created'))});return()=>s.disconnect()},[location.pathname]);return null}
export default function App(){return <><LiveRefresh/><Routes><Route path="/" element={<Home/>}/><Route path="/login" element={<Auth mode="login"/>}/><Route path="/register" element={<Auth mode="register"/>}/><Route path="/internships" element={<Internships/>}/><Route path="/internships/:id" element={<InternshipDetails/>}/><Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/><Route path="/post-internship" element={<Protected><PostInternship/></Protected>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></>}
