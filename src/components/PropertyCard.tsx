import Image from 'next/image';import Link from 'next/link';import {ArrowUpRight} from 'lucide-react';import type {Property} from '@/data/properties';
export default function PropertyCard({p}:{p:Property}){
 return <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-lux">
  <div className="relative h-64 shrink-0 overflow-hidden">
   <Image src={p.image} alt={p.name} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover object-bottom transition duration-700 group-hover:scale-105"/>
   <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent"/>
   <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur">{p.location}</span>
   <div className="absolute bottom-5 left-5 text-white"><p className="eyebrow">The Tree</p><h3 className="serif text-3xl font-semibold">{p.name.replace('The Tree ','')}</h3></div>
  </div>
  <div className="flex flex-1 flex-col p-6">
   <p className="text-sm leading-6 text-muted line-clamp-3">{p.description}</p>
   <div className="mt-5 flex flex-wrap gap-2">{p.highlights.slice(0,3).map(x=><span key={x} className="rounded-full bg-cream px-3 py-1.5 text-xs">{x}</span>)}</div>
   <Link href={`/properties/${p.slug}`} className="mt-auto flex items-center justify-between border-t border-forest/10 pt-5 text-xs font-bold uppercase tracking-widest text-forest">Explore property <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>
  </div>
 </article>
}
