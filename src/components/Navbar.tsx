'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, MessageCircle, X, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { properties } from '@/data/properties';
import TreeLogo from '@/components/TreeLogo';
const nav=[['Properties','#properties'],['Rooms','#rooms'],['Experiences','#experiences'],['Dining','#dining'],['Gallery','#gallery'],['Offers','#offers'],['About','#about']];
const mainContact = properties[0]; // primary front-desk line shown in the header
export default function Navbar(){
 const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const on=()=>setScrolled(window.scrollY>30); window.addEventListener('scroll',on); return()=>window.removeEventListener('scroll',on)},[]);
 return <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled?'border-b border-white/10 bg-[#061b14]/90 shadow-[0_15px_50px_rgba(0,0,0,.22)] backdrop-blur-2xl':'bg-gradient-to-b from-[#03100c]/65 via-[#03100c]/25 to-transparent'}`}>
  <div className={`container-x flex items-center justify-between transition-all duration-500 ${scrolled?'h-[66px]':'h-[82px]'}`}>
   <Link href="/" className="group flex items-center gap-3 text-white"><span className={`brand-mark transition-all duration-500 ${scrolled?'h-9 w-9':'h-[43px] w-[43px]'} group-hover:rotate-[8deg]`}><TreeLogo size={scrolled?18:20}/></span><span><b className={`serif block leading-none tracking-[.08em] transition-all duration-500 ${scrolled?'text-[22px]':'text-[29px]'}`}>THE TREE</b><small className="mt-1 block text-[8px] font-semibold tracking-[.34em] text-gold">HOTELS · RESORTS</small></span></Link>
   <nav className="hidden items-center gap-7 xl:flex">{nav.map(([label,href])=><Link key={label} href={href} className="nav-link">{label}</Link>)}</nav>
   <div className="hidden items-center gap-3 lg:flex"><a href={`tel:${mainContact.phone.replace(/\s/g,'')}`} className="nav-icon" aria-label="Call"><Phone size={16}/></a><a href={`https://wa.me/${mainContact.whatsapp}`} target="_blank" rel="noreferrer" className="nav-icon" aria-label="WhatsApp"><MessageCircle size={17}/></a><Link href="#enquiry" className="gold-button px-5">Plan your stay <span>↗</span></Link></div>
   <button aria-label="Open menu" onClick={()=>setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-gold/50 hover:text-gold lg:hidden">{open?<X/>:<Menu/>}</button>
  </div>
  <AnimatePresence>{open&&<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:.3,ease:[.22,1,.36,1]}} className="overflow-hidden border-t border-white/10 bg-[#061b14]/98 backdrop-blur-2xl lg:hidden"><div className="px-5 pb-6 pt-3"><div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-white/45"><MapPin size={13} className="text-gold"/> Pune · Lonavala</div>{nav.map(([label,href],i)=><motion.div key={label} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:i*.04}}><Link onClick={()=>setOpen(false)} href={href} className="block border-b border-white/10 py-4 text-sm font-semibold uppercase tracking-[.12em] text-white transition hover:text-gold">{label}</Link></motion.div>)}<Link onClick={()=>setOpen(false)} href="#enquiry" className="gold-button mt-5 flex justify-center">Book / Enquire <span>↗</span></Link></div></motion.div>}</AnimatePresence>
 </header>
}
