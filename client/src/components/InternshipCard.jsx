import React from 'react'
import {Link} from 'react-router-dom'
import {Bookmark,MapPin,Clock3} from 'lucide-react'
export default function InternshipCard({job,onSave}){
 return <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
  <div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-50 text-lg font-black">{(job.companyName||'I')[0]}</div><button onClick={()=>onSave?.(job)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-brand"><Bookmark size={18}/></button></div>
  <h3 className="mt-5 line-clamp-2 text-lg font-black text-navy">{job.title}</h3>
  <p className="mt-1 text-sm font-semibold text-slate-500">{job.companyName}</p>
  <div className="mt-4 grid gap-2 text-xs font-semibold text-slate-500"><span className="flex items-center gap-1.5"><MapPin size={14}/>{job.location||'Pan India'}</span><span className="flex items-center gap-1.5"><Clock3 size={14}/>{job.duration||'Flexible duration'}</span></div>
  <p className="mt-4 font-black text-emerald-600">{job.stipend||'Stipend not specified'}</p>
  <div className="mt-4 flex flex-wrap gap-2">{(job.skills||[]).slice(0,3).map(s=><span key={s} className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700">{s}</span>)}</div>
  <Link to={`/internships/${job._id}`} className="mt-5 block rounded-xl border border-brand py-2.5 text-center text-sm font-black text-brand transition hover:bg-brand hover:text-white">View Details</Link>
 </article>
}
