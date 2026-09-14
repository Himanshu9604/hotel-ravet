'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import GalleryLightbox from '@/components/GalleryLightbox';
import type { GalleryItem } from '@/data/properties';

export default function PropertyGallery({ items, propertyName }:{ items:GalleryItem[]; propertyName:string }){
 const [open, setOpen] = useState(false);
 const [index, setIndex] = useState(0);
 if(!items.length) return null;
 // The grid's first tile spans 2x2, so the remaining tiles must be a multiple of 4
 // to fill every row exactly — otherwise the last row leaves an empty gap (5, 9, 13...).
 const tiers = [13, 9, 5, 1];
 const previewCount = tiers.find(t => items.length >= t) ?? items.length;
 const preview = items.slice(0, previewCount);

 return <section className="bg-[#f7f4eb] py-20"><div className="container-x">
  <h2 className="serif mt-2 text-5xl font-semibold">Photos from <i>{propertyName.replace('The Tree ', '')}.</i></h2>
  <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
   {preview.map((it, i) => (
    <button type="button" key={it.src} onClick={() => { setIndex(i); setOpen(true); }} className={`${i === 0 ? 'col-span-2 row-span-2 h-[300px] md:h-[420px]' : 'h-[145px] md:h-[200px]'} group relative overflow-hidden rounded-2xl`}>
     {it.type === 'video' ? (
      <video src={it.src} className="h-full w-full object-cover" muted playsInline preload="metadata" />
     ) : (
      <Image src={it.src} alt={`${propertyName} photo ${i + 1}`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-110" />
     )}
     {it.type === 'video' && <span className="absolute inset-0 grid place-items-center bg-black/25"><PlayCircle className="text-white" size={i === 0 ? 44 : 26} /></span>}
    </button>
   ))}
  </div>
  {items.length > previewCount && <div className="mt-7 flex justify-center"><button type="button" onClick={() => { setIndex(previewCount); setOpen(true); }} className="glass-button-dark h-14 px-8">View all {items.length} photos <ArrowUpRight size={17} /></button></div>}
  {open && <GalleryLightbox items={items} index={index} onIndexChange={setIndex} onClose={() => setOpen(false)} />}
 </div></section>;
}
