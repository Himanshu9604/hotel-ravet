'use client';
import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '@/data/properties';

export default function GalleryLightbox({ items, index, onClose, onIndexChange }:{ items:GalleryItem[]; index:number; onClose:()=>void; onIndexChange:(i:number)=>void }){
 const go = useCallback((dir:number)=>{ onIndexChange((index + dir + items.length) % items.length); }, [index, items.length, onIndexChange]);

 useEffect(()=>{
  const onKey = (e:KeyboardEvent) => {
   if(e.key==='Escape') onClose();
   if(e.key==='ArrowRight') go(1);
   if(e.key==='ArrowLeft') go(-1);
  };
  window.addEventListener('keydown', onKey);
  document.body.style.overflow = 'hidden';
  return ()=>{ window.removeEventListener('keydown', onKey); document.body.style.overflow=''; };
 }, [go, onClose]);

 const current = items[index];
 if(!current) return null;

 return (
  <AnimatePresence>
   <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm" onClick={onClose}>
    <button aria-label="Close gallery" onClick={onClose} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-gold/50 hover:text-gold md:right-8 md:top-8"><X size={20}/></button>
    <p className="absolute left-4 top-4 text-[10px] font-bold uppercase tracking-[.2em] text-white/60 md:left-8 md:top-8">{index+1} / {items.length}</p>

    <button aria-label="Previous" onClick={(e)=>{e.stopPropagation();go(-1);}} className="absolute left-2 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-gold/50 hover:text-gold md:left-6"><ChevronLeft size={22}/></button>
    <button aria-label="Next" onClick={(e)=>{e.stopPropagation();go(1);}} className="absolute right-2 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-gold/50 hover:text-gold md:right-6"><ChevronRight size={22}/></button>

    <AnimatePresence mode="wait">
     <motion.div key={index} initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.97}} transition={{duration:.25}} onClick={(e)=>e.stopPropagation()} className="relative flex max-h-[85vh] w-full max-w-4xl items-center justify-center">
      {current.type==='video' ? (
       <video src={current.src} controls autoPlay className="max-h-[85vh] w-full rounded-2xl bg-black" />
      ) : (
       <div className="relative h-[80vh] w-full"><Image src={current.src} alt={`Gallery image ${index+1}`} fill sizes="90vw" className="object-contain" /></div>
      )}
     </motion.div>
    </AnimatePresence>

    <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 gap-2 md:flex">
     {items.slice(0,12).map((it,i)=><button key={i} onClick={(e)=>{e.stopPropagation();onIndexChange(i);}} className={`h-1.5 rounded-full transition-all ${i===index?'w-6 bg-gold':'w-1.5 bg-white/30 hover:bg-white/50'}`} />)}
    </div>
   </motion.div>
  </AnimatePresence>
 );
}
