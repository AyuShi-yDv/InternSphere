import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Eye,EyeOff,CheckCircle2} from 'lucide-react'
import Navbar from '../components/Navbar'
import {useAuth} from '../context/AuthContext'

export default function Auth({mode}){
 const loginMode=mode==='login'
 const {login,register}=useAuth()
 const nav=useNavigate()

 const [show,setShow]=useState(false)
 const [busy,setBusy]=useState(false)
 const [error,setError]=useState('')

 const [f,setF]=useState({
   name:'',
   email:'',
   password:'',
   confirmPassword:'',
   role:'student',
   adminKey:''
 })

 const set=(k,v)=>setF(x=>({...x,[k]:v}))

 const submit=async e=>{
   e.preventDefault()
   setError('')

   if(!loginMode&&f.password!==f.confirmPassword)
     return setError('Passwords do not match')

   setBusy(true)

   try{
     const data=loginMode
       ?await login({email:f.email,password:f.password})
       :await register(f)

     nav('/dashboard')

   }catch(e){
     setError(
       e.response?.data?.message||
       'Unable to complete request'
     )
   }finally{
     setBusy(false)
   }
 }

 return <div className="min-h-screen bg-white">

   <Navbar/>

   <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl lg:grid-cols-2">

     {/* LEFT SIDE */}

     <div className="hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-12 lg:flex lg:flex-col lg:justify-between">

       <div>

         <p className="font-black text-brand">
           INTERNSPHERE
         </p>

         <h1 className="mt-12 max-w-md text-5xl font-black leading-tight">
           {loginMode
             ?'Welcome Back!'
             :'Create Your Account'
           }
         </h1>

         <p className="mt-5 max-w-md leading-7 text-slate-500">
           {loginMode
             ?'Glad to see you again. Please sign in to continue.'
             :'Join InternSphere and discover amazing opportunities.'
           }
         </p>


         {/* HERO IMAGE */}

         <div className="mt-10 flex justify-center">

           <div className="w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-white p-4 shadow-soft">

             <img
               src="/hero-image.png"
               alt="InternSphere"
               className="h-64 w-full rounded-[2rem] object-cover"
             />

           </div>

         </div>


         {/* FEATURES */}

         <div className="mt-8 space-y-3">

           {[
             'Professional internship discovery',
             'Secure authentication',
             'Student, recruiter and admin workspaces'
           ].map(x=>

             <div
               className="flex items-center gap-2 text-sm font-semibold"
               key={x}
             >

               <CheckCircle2
                 className="text-brand"
                 size={18}
               />

               {x}

             </div>

           )}

         </div>

       </div>

       <p className="text-xs text-slate-400">
         © 2026 InternSphere. All rights reserved.
       </p>

     </div>


     {/* RIGHT SIDE */}

     <div className="flex items-center justify-center p-6 sm:p-10">

       <div className="w-full max-w-md">

         <h2 className="text-3xl font-black">
           {loginMode?'Sign In':'Sign Up'}
         </h2>

         <p className="mt-2 text-sm text-slate-500">
           {loginMode
             ?'Enter your credentials to access your account.'
             :'Create your account to get started.'
           }
         </p>


         {/* ERROR */}

         {error&&

           <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">
             {error}
           </div>

         }


         {/* FORM */}

         <form
           onSubmit={submit}
           className="mt-7 space-y-4"
         >

           {/* NAME */}

           {!loginMode&&

             <label className="grid gap-2 text-sm font-bold">

               Full name

               <input
                 required
                 value={f.name}
                 onChange={e=>set('name',e.target.value)}
                 className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand focus:ring-4 focus:ring-indigo-50"
                 placeholder="Enter your full name"
               />

             </label>

           }


           {/* EMAIL */}

           <label className="grid gap-2 text-sm font-bold">

             Email address

             <input
               required
               type="email"
               value={f.email}
               onChange={e=>set('email',e.target.value)}
               className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand focus:ring-4 focus:ring-indigo-50"
               placeholder="Enter your email"
             />

           </label>


           {/* PASSWORD */}

           <label className="grid gap-2 text-sm font-bold">

             Password

             <div className="relative">

               <input
                 required
                 minLength={6}
                 type={show?'text':'password'}
                 value={f.password}
                 onChange={e=>set('password',e.target.value)}
                 className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none focus:border-brand focus:ring-4 focus:ring-indigo-50"
                 placeholder={
                   loginMode
                     ?'Enter your password'
                     :'Create a password'
                 }
               />

               <button
                 type="button"
                 onClick={()=>setShow(!show)}
                 className="absolute right-3 top-3 text-slate-400"
               >

                 {show
                   ?<EyeOff size={18}/>
                   :<Eye size={18}/>
                 }

               </button>

             </div>

           </label>


           {/* SIGN UP ONLY */}

           {!loginMode&&

             <>

               {/* CONFIRM PASSWORD */}

               <label className="grid gap-2 text-sm font-bold">

                 Confirm Password

                 <input
                   required
                   type="password"
                   value={f.confirmPassword}
                   onChange={e=>set('confirmPassword',e.target.value)}
                   className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand focus:ring-4 focus:ring-indigo-50"
                   placeholder="Confirm your password"
                 />

               </label>


               {/* ROLE */}

               <label className="grid gap-2 text-sm font-bold">

                 Account type

                 <select
                   value={f.role}
                   onChange={e=>set('role',e.target.value)}
                   className="rounded-xl border border-slate-200 px-4 py-3"
                 >

                   <option value="student">
                     Student
                   </option>

                   <option value="recruiter">
                     Recruiter
                   </option>

                   <option value="admin">
                     Admin
                   </option>

                 </select>

               </label>


               {/* ADMIN KEY */}

               {f.role==='admin'&&

                 <label className="grid gap-2 text-sm font-bold">

                   Admin signup key

                   <input
                     required
                     value={f.adminKey}
                     onChange={e=>set('adminKey',e.target.value)}
                     className="rounded-xl border border-slate-200 px-4 py-3"
                     placeholder="Provided by system owner"
                   />

                 </label>

               }

             </>

           }


           {/* SUBMIT */}

           <button
             disabled={busy}
             className="w-full rounded-xl bg-brand py-3.5 font-black text-white shadow-lg shadow-indigo-200 disabled:opacity-60"
           >

             {busy
               ?'Please wait…'
               :loginMode
                 ?'Sign In'
                 :'Create Account'
             }

           </button>

         </form>


         {/* SWITCH LOGIN / SIGNUP */}

         <p className="mt-6 text-center text-sm text-slate-500">

           {loginMode
             ?'Don’t have an account? '
             :'Already have an account? '
           }

           <Link
             className="font-black text-brand"
             to={loginMode?'/register':'/login'}
           >

             {loginMode
               ?'Sign up'
               :'Sign in'
             }

           </Link>

         </p>

       </div>

     </div>

   </div>

 </div>
}