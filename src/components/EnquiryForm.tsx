'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Check, CheckCircle2, Loader2, Mail, MessageCircle, Minus, Plus, Send, Sparkles, User2 } from 'lucide-react';
import { properties, getProperty } from '@/data/properties';

const DEFAULT_WHATSAPP = properties[0].whatsapp;
const DEFAULT_EMAIL = properties[0].email;
const ease = [.22, 1, .36, 1] as [number, number, number, number];

type FormState = { name:string; phone:string; email:string; propertySlug:string; checkIn:string; checkOut:string; guests:number; message:string };
const initialForm:FormState={name:'',phone:'',email:'',propertySlug:'',checkIn:'',checkOut:'',guests:2,message:''};

function buildWhatsAppMessage(form:FormState, propertyName:string){
 return ['🌿 THE TREE — STAY ENQUIRY','',`Guest: ${form.name || 'Not provided'}`,`Property: ${propertyName || 'Not selected'}`,`Check-in: ${form.checkIn || 'Flexible'}`,`Check-out: ${form.checkOut || 'Flexible'}`,`Guests: ${form.guests}`,`Phone: ${form.phone || 'Not provided'}`,`Email: ${form.email || 'Not provided'}`,`Request: ${form.message || 'No special request'}`].join('\n');
}

const steps = ['Where & when', 'Your details', 'Review & send'];

export default function EnquiryForm(){
 const searchParams = useSearchParams();
 const [step,setStep]=useState(0);
 const [dir,setDir]=useState(1);
 const [form,setForm]=useState(initialForm);
 const [loading,setLoading]=useState(false);
 const [sent,setSent]=useState(false);
 const [error,setError]=useState('');

 useEffect(()=>{
  const slug = searchParams.get('property');
  if(slug && getProperty(slug)) setForm(v=>({...v,propertySlug:slug}));
 },[searchParams]);

 const selectedProperty = getProperty(form.propertySlug);
 const targetWhatsApp = selectedProperty?.whatsapp || DEFAULT_WHATSAPP;
 const targetEmail = selectedProperty?.email || DEFAULT_EMAIL;

 const change=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{setForm(v=>({...v,[e.target.name]:e.target.value}));setError('')};
 const setGuests=(n:number)=>setForm(v=>({...v,guests:Math.min(10,Math.max(1,n))}));
 const goto=(n:number)=>{setDir(n>step?1:-1);setStep(n)};

 const step1Valid = !!form.propertySlug && !!form.checkIn && !!form.checkOut;
 const step2Valid = !!form.name && !!form.phone && !!form.email;

 const whatsapp=()=>{window.open(`https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(buildWhatsAppMessage(form, selectedProperty?.name || ''))}`,'_blank','noopener,noreferrer')};
 const submit=async(e:FormEvent)=>{
  e.preventDefault();setLoading(true);setError('');
  try{
   const response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    name:form.name,phone:form.phone,email:form.email,propertySlug:form.propertySlug,
    checkIn:form.checkIn,checkOut:form.checkOut,guests:String(form.guests),message:form.message
   })});
   const data=await response.json().catch(()=>null);
   if(!response.ok||data?.success===false)throw new Error(data?.error||'send failed');
   setSent(true)
  }catch{
   setError('Email send nahi ho paya abhi (SMTP set nahi hai). Please WhatsApp enquiry use karo — message already ready hai.')
  }finally{setLoading(false)}
 };
 const reset=()=>{setSent(false);setStep(0);setForm(initialForm)};

 const variants = { enter:(d:number)=>({opacity:0,x:d>0?36:-36}), center:{opacity:1,x:0}, exit:(d:number)=>({opacity:0,x:d>0?-36:36}) };

 return <section id="enquiry" className="relative overflow-hidden bg-[#f7f4eb] py-24 md:py-32">
  <div className="absolute -left-36 top-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl"/>
  <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-gold-2/10 blur-3xl"/>
  <div className="container-x relative z-10"><div className="grid grid-cols-1 gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-stretch">

   <div className="rounded-[34px] bg-forest p-7 text-white md:p-10 lg:p-12"><div className="flex h-full flex-col">
    <p className="eyebrow">Private stay concierge</p>
    <h2 className="serif mt-4 text-5xl font-semibold leading-[.92] md:text-7xl">Make your next stay <i className="text-gold">feel effortless.</i></h2>
    <p className="mt-6 max-w-md text-sm leading-7 text-white/65">A quick 3-step form. Choose your property, share your details, and we route it straight to that property's own team — by email and WhatsApp.</p>
    <div className="mt-9 grid gap-3">
     <a href={`mailto:${targetEmail}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] p-4 text-sm text-white/80 transition hover:border-gold/30 hover:bg-white/[.08]"><span className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 text-gold"><Mail size={18}/></span><span><b className="block text-xs text-white">{selectedProperty?`Email ${selectedProperty.name.replace('The Tree ','')}`:'Email the stay team'}</b><small className="mt-1 block text-white/45">{targetEmail}</small></span></a>
     <a href={`https://wa.me/${targetWhatsApp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-gold/25 bg-gold/[.08] p-4 text-sm text-white/80 transition hover:border-gold/50 hover:bg-gold/[.12]"><span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-forest"><MessageCircle size={18}/></span><span><b className="block text-xs text-white">{selectedProperty?`Chat with ${selectedProperty.name.replace('The Tree ','')}`:'Chat on WhatsApp'}</b><small className="mt-1 block text-white/45">{selectedProperty?.phone||'+91 96042 58627'}</small></span></a>
    </div>
    <div className="mt-9 grid gap-2.5 text-xs text-white/55">
     <span className="flex items-center gap-2"><Check size={14} className="text-gold"/> No payment required to enquire</span>
     <span className="flex items-center gap-2"><Check size={14} className="text-gold"/> Goes to the property's own team, not a call centre</span>
     <span className="flex items-center gap-2"><Check size={14} className="text-gold"/> Usually replied to within a few hours</span>
    </div>
    <div className="mt-auto pt-10"><div className="border-t border-white/10 pt-6"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-gold"><Sparkles size={13}/> One form · three destinations, routed separately</p><p className="mt-2 text-xs leading-5 text-white/40">Ravet · Hinjewadi Phase 3 · Lonavala</p></div></div>
   </div></div>

   <div className="relative overflow-hidden rounded-[34px] bg-white p-6 shadow-lux md:p-9 lg:p-10">
    <AnimatePresence mode="wait">
    {sent ? (
     <motion.div key="sent" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.4,ease}} className="flex min-h-[540px] flex-col items-center justify-center text-center">
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:260,damping:16,delay:.1}}><CheckCircle2 size={70} className="text-forest"/></motion.div>
      <h3 className="serif mt-5 text-5xl font-semibold">Your enquiry is on its way.</h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-muted">Thank you for reaching out to The Tree. {selectedProperty?selectedProperty.name:'Our team'} has received your stay request and will be in touch shortly.</p>
      <button onClick={reset} className="mt-7 rounded-full bg-forest px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-xl">Send another enquiry</button>
     </motion.div>
    ) : (
     <motion.form key="form" onSubmit={submit} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex min-h-[540px] flex-col">

      <div className="mb-8"><div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[.16em] text-muted">{steps.map((s,i)=><span key={s} className={i<=step?'text-forest':''}>{s}</span>)}</div>
       <div className="relative mt-3 h-1.5 rounded-full bg-forest/10"><motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold to-gold-2" animate={{width:`${((step+1)/steps.length)*100}%`}} transition={{duration:.5,ease}}/></div>
      </div>

      <div className="flex-1">
      <AnimatePresence mode="wait" custom={dir} initial={false}>

       {step===0 && <motion.div key="s1" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{duration:.35,ease}} className="w-full">
        <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-gold">Step 1 of 3</p>
        <h3 className="serif mt-1 text-4xl font-semibold text-ink">Where would you like to stay?</h3>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">{properties.map(p=>{
         const active = form.propertySlug===p.slug;
         return <button type="button" key={p.slug} onClick={()=>setForm(v=>({...v,propertySlug:p.slug}))} className={`group relative overflow-hidden rounded-2xl border-2 text-left transition ${active?'border-gold shadow-lux':'border-transparent hover:border-forest/15'}`}>
          <div className="relative h-24 w-full"><Image src={p.image} alt={p.name} fill sizes="200px" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>{active && <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-gold text-forest"><Check size={13}/></span>}</div>
          <div className="bg-cream p-3"><b className="block text-xs leading-tight">{p.name.replace('The Tree ','')}</b><small className="text-[10px] text-muted">{p.location}</small></div>
         </button>;
        })}</div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
         <label className="field-wrap"><span className="flex items-center gap-1.5"><Calendar size={12}/> Check-in</span><input required type="date" name="checkIn" value={form.checkIn} onChange={change} className="field"/></label>
         <label className="field-wrap"><span className="flex items-center gap-1.5"><Calendar size={12}/> Check-out</span><input required type="date" name="checkOut" value={form.checkOut} onChange={change} className="field"/></label>
        </div>

        <div className="mt-4"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.16em] text-gold">Guests</span>
         <div className="flex w-fit items-center gap-4 rounded-full border border-forest/12 bg-[#faf9f5] px-4 py-2.5">
          <button type="button" onClick={()=>setGuests(form.guests-1)} className="grid h-8 w-8 place-items-center rounded-full bg-white text-forest shadow-sm transition hover:bg-forest hover:text-white"><Minus size={14}/></button>
          <span className="w-6 text-center text-sm font-bold text-ink">{form.guests}</span>
          <button type="button" onClick={()=>setGuests(form.guests+1)} className="grid h-8 w-8 place-items-center rounded-full bg-white text-forest shadow-sm transition hover:bg-forest hover:text-white"><Plus size={14}/></button>
         </div>
        </div>
       </motion.div>}

       {step===1 && <motion.div key="s2" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{duration:.35,ease}} className="w-full">
        <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-gold">Step 2 of 3</p>
        <h3 className="serif mt-1 text-4xl font-semibold text-ink">Tell us a little about you.</h3>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
         <label className="field-wrap"><span className="flex items-center gap-1.5"><User2 size={12}/> Full name</span><input required name="name" value={form.name} onChange={change} placeholder="Your name" className="field"/></label>
         <label className="field-wrap"><span>Phone number</span><input required name="phone" value={form.phone} onChange={change} placeholder="10-digit mobile" inputMode="tel" className="field"/></label>
         <label className="field-wrap sm:col-span-2"><span>Email address</span><input required type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" className="field"/></label>
         <label className="field-wrap sm:col-span-2"><span>Special request <i className="normal-case text-muted">(optional)</i></span><textarea name="message" value={form.message} onChange={change} placeholder="Celebration, room preference, anything we should know..." rows={3} className="field resize-none"/></label>
        </div>
       </motion.div>}

       {step===2 && selectedProperty && <motion.div key="s3" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{duration:.35,ease}} className="w-full">
        <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-gold">Step 3 of 3</p>
        <h3 className="serif mt-1 text-4xl font-semibold text-ink">Everything look right?</h3>
        <div className="mt-6 overflow-hidden rounded-2xl border border-forest/10">
         <div className="relative h-28 w-full"><Image src={selectedProperty.image} alt={selectedProperty.name} fill className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-forest/85 to-transparent"/><div className="absolute bottom-3 left-4 text-white"><b className="serif text-2xl">{selectedProperty.name.replace('The Tree ','')}</b></div></div>
         <div className="grid grid-cols-2 gap-y-3 bg-[#faf9f5] p-5 text-xs sm:grid-cols-4">
          <div><p className="text-[9px] uppercase tracking-widest text-muted">Check-in</p><p className="mt-1 font-bold text-ink">{form.checkIn||'—'}</p></div>
          <div><p className="text-[9px] uppercase tracking-widest text-muted">Check-out</p><p className="mt-1 font-bold text-ink">{form.checkOut||'—'}</p></div>
          <div><p className="text-[9px] uppercase tracking-widest text-muted">Guests</p><p className="mt-1 font-bold text-ink">{form.guests}</p></div>
          <div><p className="text-[9px] uppercase tracking-widest text-muted">Phone</p><p className="mt-1 font-bold text-ink">{form.phone}</p></div>
          <div className="col-span-2 sm:col-span-4"><p className="text-[9px] uppercase tracking-widest text-muted">Booked by</p><p className="mt-1 font-bold text-ink">{form.name} · {form.email}</p></div>
          {form.message && <div className="col-span-2 sm:col-span-4"><p className="text-[9px] uppercase tracking-widest text-muted">Request</p><p className="mt-1 text-ink">{form.message}</p></div>}
         </div>
        </div>
        {error && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">{error}</p>}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
         <button type="submit" disabled={loading} className="flex h-13 items-center justify-center gap-2 rounded-full bg-forest font-bold text-white transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60">{loading?<><Loader2 size={17} className="animate-spin"/> Sending...</>:<><Send size={17}/> Send by email</>}</button>
         <button type="button" onClick={whatsapp} className="flex h-13 items-center justify-center gap-2 rounded-full border border-forest/20 bg-[#f8faf7] font-bold text-forest transition hover:-translate-y-0.5 hover:bg-forest/5"><MessageCircle size={18}/> Send on WhatsApp</button>
        </div>
        <p className="mt-4 text-center text-[10px] leading-5 text-muted">Goes straight to <b>{selectedProperty.name}</b> — {targetEmail} · WhatsApp {selectedProperty.phone}</p>
       </motion.div>}

      </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-forest/8 pt-6">
       {step>0 ? <button type="button" onClick={()=>goto(step-1)} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted transition hover:text-forest"><ArrowLeft size={15}/> Back</button> : <span/>}
       {step<2 && <button type="button" disabled={step===0?!step1Valid:!step2Valid} onClick={()=>goto(step+1)} className="flex items-center gap-1.5 rounded-full bg-forest px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none">Continue <ArrowRight size={15}/></button>}
      </div>
     </motion.form>
    )}
    </AnimatePresence>
   </div>

  </div></div>
 </section>
}
