import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Menu,X} from 'lucide-react'
import Logo from './Logo'
import {useAuth} from '../context/AuthContext'
export default function Navbar(){
 const [open,setOpen]=useState(false); const {user,logout}=useAuth()
 return <header className="glass sticky top-0 z-50">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
   <Link to="/"><Logo/></Link>
   <nav className="hidden items-center gap-7 lg:flex">
    <Link className="text-sm font-semibold hover:text-brand" to="/internships">Internships</Link>
    <a className="text-sm font-semibold hover:text-brand" href="/#companies">Companies</a>
    <a className="text-sm font-semibold hover:text-brand" href="/#students">For Students</a>
    <a className="text-sm font-semibold hover:text-brand" href="/#recruiters">For Recruiters</a>
    <a className="text-sm font-semibold hover:text-brand" href="/#about">About Us</a>
   </nav>
   <div className="hidden items-center gap-3 lg:flex">
    {user?<><Link to="/dashboard" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">Dashboard</Link><button onClick={logout} className="rounded-xl bg-navy px-5 py-2.5 text-sm font-bold text-white">Sign out</button></>:<><Link to="/login" className="rounded-xl border border-brand px-5 py-2.5 text-sm font-bold text-brand">Log In</Link><Link to="/register" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200">Sign Up</Link></>}
   </div>
   <button className="lg:hidden" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  </div>
  {open&&<div className="border-t bg-white p-5 lg:hidden"><div className="grid gap-4">
    <Link to="/internships" onClick={()=>setOpen(false)}>Internships</Link><a href="/#companies">Companies</a><a href="/#students">For Students</a><a href="/#recruiters">For Recruiters</a><a href="/#about">About Us</a>
    {user?<><Link to="/dashboard">Dashboard</Link><button className="text-left font-bold" onClick={logout}>Sign out</button></>:<><Link to="/login">Log In</Link><Link to="/register" className="font-bold text-brand">Sign Up</Link></>}
  </div></div>}
 </header>
}
