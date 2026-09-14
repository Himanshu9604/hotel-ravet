import Image from 'next/image';import Link from 'next/link';import {ArrowLeft,ArrowUpRight,Check,MapPin,Phone,Coffee,UtensilsCrossed,Sunrise} from 'lucide-react';import {properties,getProperty} from '@/data/properties';import {notFound} from 'next/navigation';
import PropertyGallery from '@/components/PropertyGallery';
import type {Metadata} from 'next';

export function generateStaticParams(){return properties.map(p=>({slug:p.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 const p=getProperty(slug);
 if(!p)return {};
 const title=`${p.name} | ${p.location}`;
 return {
  title,
  description:p.description,
  alternates:{canonical:`/properties/${p.slug}`},
  openGraph:{title,description:p.description,images:[{url:p.image,width:1200,height:630,alt:p.name}]},
  twitter:{card:'summary_large_image',title,description:p.description}
 };
}

export default async function PropertyPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const p=getProperty(slug);
 if(!p)notFound();
 const enquireHref = `/?property=${p.slug}#enquiry`;
 const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(p.address)}&output=embed`;

 return <main className="min-h-screen bg-cream">
  <header className="absolute z-20 w-full text-white"><div className="container-x flex h-20 items-center justify-between"><Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><ArrowLeft size={14}/> The Tree</Link><Link href={enquireHref} className="rounded-full bg-gold px-5 py-3 text-xs font-bold text-forest">Enquire</Link></div></header>

  <section className="relative h-[650px] text-white"><Image src={p.image} alt={p.name} fill priority className="object-cover object-bottom"/><div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/35 to-black/10"/><div className="container-x relative flex h-full items-end pb-16"><div><p className="eyebrow">{p.location}</p><h1 className="serif mt-3 text-6xl font-semibold md:text-8xl">{p.name}</h1><p className="mt-4 max-w-xl text-white/70">{p.tagline} {p.description}</p></div></div></section>

  <section className="container-x grid grid-cols-1 gap-12 py-20 lg:grid-cols-[1fr_.65fr]">
   <div><p className="eyebrow">About this property</p><h2 className="serif mt-3 text-5xl font-semibold">A stay made <i>for you.</i></h2><p className="mt-6 text-sm leading-8 text-muted">{p.description}</p><div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">{p.highlights.map(x=><div key={x} className="rounded-2xl bg-white p-4 font-semibold">{x}</div>)}</div></div>
   <div className="rounded-[28px] bg-forest p-7 text-white"><p className="eyebrow">Stay options</p><div className="mt-5 space-y-3">{p.rooms.map(x=><div key={x} className="flex items-start justify-between gap-3 border-b border-white/10 py-3"><span className="text-sm leading-6">{x}</span><Check className="mt-0.5 shrink-0 text-gold" size={17}/></div>)}</div><Link href={enquireHref} className="mt-7 block rounded-full bg-gold py-3 text-center text-xs font-bold uppercase tracking-widest text-forest">Enquire for this property</Link></div>
  </section>

  <section className="bg-white py-20"><div className="container-x"><p className="eyebrow">Amenities</p><h2 className="serif mt-2 text-5xl font-semibold">Thoughtful <i>essentials.</i></h2><div className="mt-8 flex flex-wrap gap-3">{p.amenities.map(x=><span key={x} className="rounded-full border border-forest/10 bg-cream px-5 py-3 text-sm">{x}</span>)}</div>
   <div className="mt-12 flex flex-wrap gap-3 text-sm text-muted"><span className="flex items-center gap-2"><MapPin size={16}/> {p.address}</span><span className="flex items-center gap-2"><Phone size={16}/> {p.phone}</span>{p.mapUrl && <a href={p.mapUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-forest underline underline-offset-4">View on Google Maps</a>}</div>
   <div className="mt-8 overflow-hidden rounded-[28px] border border-forest/10 shadow-lux"><iframe title={`${p.name} location map`} src={mapEmbedSrc} width="100%" height="360" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block" /></div>
  </div></section>

  <PropertyGallery items={p.gallery} propertyName={p.name} />

  {p.mealPlan && <section className="bg-white py-20"><div className="container-x">
   <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Meal plan</p><h2 className="serif mt-2 text-5xl font-semibold">Hi-tea, dinner <i className="text-forest/65">& breakfast.</i></h2></div><div className="rounded-2xl bg-forest px-6 py-4 text-white"><p className="text-[10px] uppercase tracking-[.2em] text-gold">Per person / villa stay</p><p className="serif mt-1 text-3xl font-semibold">{p.mealPlan.pricePerPerson}</p></div></div>
   <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{p.mealPlan.note}</p>
   <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
    <div className="rounded-[24px] bg-[#f7f4eb] p-6 shadow-lux"><div className="flex items-center gap-2 text-forest"><Coffee size={18}/><b className="text-xs font-bold uppercase tracking-[.16em]">Hi-Tea</b></div><ul className="mt-4 space-y-2 text-sm text-muted">{p.mealPlan.hiTea.map(x=><li key={x} className="flex items-center gap-2"><Check size={14} className="text-gold"/> {x}</li>)}</ul></div>
    <div className="rounded-[24px] bg-[#f7f4eb] p-6 shadow-lux"><div className="flex items-center gap-2 text-forest"><UtensilsCrossed size={18}/><b className="text-xs font-bold uppercase tracking-[.16em]">Dinner</b></div><ul className="mt-4 space-y-2 text-sm text-muted">{p.mealPlan.dinner.map(x=><li key={x} className="flex items-center gap-2"><Check size={14} className="text-gold"/> {x}</li>)}</ul></div>
    <div className="rounded-[24px] bg-[#f7f4eb] p-6 shadow-lux"><div className="flex items-center gap-2 text-forest"><Sunrise size={18}/><b className="text-xs font-bold uppercase tracking-[.16em]">Breakfast</b></div><ul className="mt-4 space-y-2 text-sm text-muted">{p.mealPlan.breakfast.map(x=><li key={x} className="flex items-center gap-2"><Check size={14} className="text-gold"/> {x}</li>)}</ul></div>
   </div>
  </div></section>}

  <section className="bg-forest py-16 text-white"><div className="container-x flex flex-col items-center gap-5 text-center"><p className="eyebrow">Ready when you are</p><h2 className="serif text-4xl font-semibold md:text-5xl">Plan your stay at {p.name.replace('The Tree ','')}.</h2><Link href={enquireHref} className="gold-button h-14 px-8">Enquire for this property <ArrowUpRight size={16}/></Link></div></section>
 </main>
}
