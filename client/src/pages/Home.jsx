import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import {ArrowRight,BriefcaseBusiness,Building2,Users,ShieldCheck,Search,Send,BarChart3} from 'lucide-react'
import Navbar from '../components/Navbar'
import InternshipCard from '../components/InternshipCard'
import api from '../services/api'

export default function Home(){
 const [jobs,setJobs]=useState([])

 useEffect(()=>{
   api.get('/internships?limit=8')
      .then(r=>setJobs(r.data.data))
      .catch(()=>{})
 },[])

 return <><Navbar/><main>

  <section className="overflow-hidden bg-gradient-to-b from-white via-indigo-50/20 to-white">
   <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:py-20 lg:grid-cols-[1fr_.9fr] lg:py-24">

    <motion.div initial={{opacity:0,x:-25}} animate={{opacity:1,x:0}}>

     <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-xs font-black text-brand">
       YOUR CAREER STARTS HERE
     </span>

     <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.04] tracking-tight md:text-6xl lg:text-[70px]">
       Find Internships.<br/>
       <span className="gradient-text">Launch Your Career.</span>
     </h1>

     <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
       InternSphere connects talented students with amazing internship opportunities from top companies.
     </p>

     <div className="mt-8 flex flex-wrap gap-3">
       <Link
         to="/internships"
         className="rounded-xl bg-brand px-6 py-3.5 font-black text-white shadow-lg shadow-indigo-200"
       >
         Explore Internships
       </Link>

       <Link
         to="/register"
         className="rounded-xl border border-brand bg-white px-6 py-3.5 font-black text-brand"
       >
         For Recruiters
       </Link>
     </div>

     <div className="mt-8 flex items-center gap-3">
       <div className="flex -space-x-2">
         {[1,2,3,4].map(i=>
           <div
             key={i}
             className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-slate-200 text-[10px] font-black"
           >
             {i}
           </div>
         )}
       </div>

       <p className="text-sm font-semibold text-slate-500">
         Trusted by students & companies
       </p>
     </div>

    </motion.div>


    <motion.div
      initial={{opacity:0,scale:.92}}
      animate={{opacity:1,scale:1}}
      className="relative min-h-[470px]"
    >

      <div className="absolute inset-8 rounded-full bg-indigo-200/50 blur-3xl"></div>

      <div className="absolute right-0 top-4 rounded-2xl bg-white p-4 shadow-soft">
        <p className="text-2xl font-black">12K+</p>
        <p className="text-xs text-slate-500">Active Internships</p>
      </div>

      <div className="absolute bottom-16 left-0 rounded-2xl bg-white p-4 shadow-soft">
        <p className="text-2xl font-black">50K+</p>
        <p className="text-xs text-slate-500">Students Placed</p>
      </div>

      <div className="absolute inset-x-12 bottom-0 top-12 rounded-[40%] bg-gradient-to-b from-indigo-100 to-white"></div>


      {/* HERO IMAGE */}

      <div className="absolute inset-x-20 top-24 rounded-[3rem] bg-white p-6 shadow-soft">

        <img
          src="/hero-image.png"
          alt="InternSphere"
          className="mx-auto h-64 w-full rounded-[2.5rem] object-cover"
        />

        <div className="mt-5 rounded-2xl border p-4">
          <p className="font-black">
            Build your future
          </p>

          <p className="text-xs text-slate-500">
            One opportunity at a time.
          </p>
        </div>

      </div>

    </motion.div>

   </div>
  </section>


  <section className="mx-auto max-w-7xl px-5">
   <div className="grid divide-y rounded-2xl border bg-white shadow-sm md:grid-cols-4 md:divide-x md:divide-y-0">

    {[
      ['12,000+','Active Internships'],
      ['500+','Top Companies'],
      ['50,000+','Students Placed'],
      ['98%','Satisfaction Rate']
    ].map(([a,b])=>
      <div className="flex items-center gap-4 p-6" key={a}>

        <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-brand">
          <BriefcaseBusiness size={18}/>
        </div>

        <div>
          <p className="font-black">{a}</p>
          <p className="text-xs text-slate-500">{b}</p>
        </div>

      </div>
    )}

   </div>
  </section>


  <section id="internships" className="mx-auto max-w-7xl px-5 py-20">

   <div className="flex items-end justify-between">

    <div>
      <p className="text-sm font-black tracking-widest text-brand">
        FEATURED INTERNSHIPS
      </p>

      <h2 className="mt-2 text-3xl font-black md:text-4xl">
        Latest opportunities
      </h2>
    </div>

    <Link
      to="/internships"
      className="hidden items-center gap-2 text-sm font-black text-brand sm:flex"
    >
      View all internships
      <ArrowRight size={16}/>
    </Link>

   </div>

   <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
     {jobs.slice(0,4).map(j=>
       <InternshipCard key={j._id} job={j}/>
     )}
   </div>

  </section>


  <section id="students" className="bg-slate-50 py-20">

   <div className="mx-auto max-w-7xl px-5">

    <div className="mx-auto max-w-2xl text-center">

      <p className="text-sm font-black tracking-widest text-brand">
        WHY CHOOSE INTERNSPHERE?
      </p>

      <h2 className="mt-3 text-3xl font-black md:text-4xl">
        Everything you need to move forward.
      </h2>

    </div>

    <div className="mt-10 grid gap-5 md:grid-cols-4">

      {[
        ['Verified Opportunities','Curated listings from trusted sources.',ShieldCheck],
        ['Easy Application','Simple and quick application process.',Send],
        ['Career Growth','Learn, grow and build your network.',BarChart3],
        ['Expert Support','Get help at every step of your journey.',Users]
      ].map(([t,d,I])=>

        <div className="rounded-2xl bg-white p-6" key={t}>

          <I className="text-brand"/>

          <h3 className="mt-6 font-black">
            {t}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {d}
          </p>

        </div>

      )}

    </div>

   </div>

  </section>


  <section id="recruiters" className="bg-navy py-20 text-white">

   <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2">

    <div>

      <p className="text-sm font-black tracking-widest text-indigo-300">
        FOR RECRUITERS
      </p>

      <h2 className="mt-4 text-4xl font-black">
        Find the right talent for your next opportunity.
      </h2>

      <p className="mt-5 max-w-xl leading-8 text-white/60">
        Publish internships, manage applicants and connect with students through a professional recruiter workspace.
      </p>

      <Link
        to="/register"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-black text-navy"
      >
        Start hiring
        <ArrowRight size={17}/>
      </Link>

    </div>


    <div className="grid gap-4 sm:grid-cols-2">

      <div className="rounded-3xl bg-white/10 p-7">
        <Building2/>

        <p className="mt-10 text-xl font-black">
          Company profiles
        </p>
      </div>

      <div className="rounded-3xl bg-white/10 p-7">
        <Users/>

        <p className="mt-10 text-xl font-black">
          Applicant management
        </p>
      </div>

    </div>

   </div>

  </section>


  <footer id="about" className="bg-white py-10">

   <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 md:flex-row">

     <span className="font-black">
       InternSphere
     </span>

     <span className="text-sm text-slate-500">
       Built for students, recruiters and modern careers.
     </span>

   </div>

  </footer>

 </main></>
}