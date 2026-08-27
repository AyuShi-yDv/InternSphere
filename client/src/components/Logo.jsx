import React from 'react'
export default function Logo(){
 return <div className="flex items-center gap-2.5"><div className="relative grid h-10 w-10 place-items-center"><div className="absolute h-7 w-7 rounded-full border-[5px] border-brand rotate-[-20deg]"></div><div className="absolute h-2.5 w-5 rounded-full bg-brand rotate-[-28deg] -translate-x-0.5"></div><span className="relative text-[10px] font-black text-white">IS</span></div><span className="text-xl font-black tracking-tight text-navy">Intern<span className="text-brand">Sphere</span></span></div>
}
