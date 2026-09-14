'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Car, Clock3, Gift, Mail, MapPin, MessageCircle, Mountain, Percent, Phone, ShieldCheck, Sparkles, Users, Utensils, Wifi } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import EnquiryForm from '@/components/EnquiryForm';
import FlyingBirds from '@/components/FlyingBirds';
import TreeLogo from '@/components/TreeLogo';
import GalleryLightbox from '@/components/GalleryLightbox';
import { properties } from '@/data/properties';
import type { GalleryItem } from '@/data/properties';

const ease = { duration: .8, ease: [.22, 1, .36, 1] as [number, number, number, number] };
const reveal = { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0, transition: ease } };
const mainContact = properties[0];

// A hand-picked, evenly-mixed set for the homepage grid preview (first one shows big).
// Count kept at 9 (1 big + 8 normal) so the 4-column grid fills every row exactly —
// any other total leaves an empty gap in the last row.
// Clicking one opens a lightbox scoped to just this curated set — the full per-property
// galleries live on each property's own page (via PropertyGallery), not mixed in here.
const curatedGallery = [
 '/images/lonavala/gallery-1.jpg', '/images/ravet/gallary-2.jpg', '/images/hinjewadi-phase-3/gallary-3.jpg',
 '/images/lonavala/gallery-5.jpg', '/images/ravet/gallary-7.jpg', '/images/hinjewadi-phase-3/gallary-6.jpg',
 '/images/lonavala/gallery-9.jpg', '/images/ravet/gallary-11.jpg', '/images/hinjewadi-phase-3/gallary-9.jpg'
];
const curatedItems:GalleryItem[] = curatedGallery.map(src => ({ type: 'image', src }));

export default function Home() {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const openLightbox = (i:number) => { setLightboxIndex(i); setLightboxOpen(true); };
  useEffect(() => {
    const id = setInterval(() => setActive(v => (v + 1) % properties.length), 5000);
    return () => clearInterval(id);
  }, []);
  const jumpTo = (i: number) => setActive(i);
  return (
    <main className="overflow-hidden">
      <Navbar />

      <section className="hero relative min-h-[760px] overflow-hidden bg-forest text-white md:min-h-[900px]">
        <AnimatePresence initial={false} mode="popLayout">
         <motion.div key={active} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: [.22, 1, .36, 1] }} className="absolute inset-0">
          <Image
           src={properties[active].image}
           alt={`${properties[active].name} — The Tree Hotels and Resorts`}
           fill priority sizes="100vw"
           className="hero-image object-cover"
          />
         </motion.div>
        </AnimatePresence>
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-sun absolute inset-0" />
        <div className="hero-haze absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
         <motion.div animate={{ x: [0, 34, 0], y: [0, -26, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[8%] top-[22%] h-40 w-40 rounded-full bg-gold/18 blur-3xl md:h-64 md:w-64" />
         <motion.div animate={{ x: [0, -28, 0], y: [0, 22, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }} className="absolute right-[14%] top-[38%] h-32 w-32 rounded-full bg-gold-2/14 blur-3xl md:h-52 md:w-52" />
         <motion.div animate={{ x: [0, 18, 0], y: [0, 30, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: .6 }} className="absolute bottom-[12%] left-[38%] h-24 w-24 rounded-full bg-white/10 blur-2xl md:h-40 md:w-40" />
        </div>
        <FlyingBirds />

        <div className="container-x relative z-10 flex min-h-[760px] items-center pt-24 md:min-h-[900px]">
          <div className="grid grid-cols-1 w-full items-center gap-12 lg:grid-cols-[1fr_410px] xl:grid-cols-[1fr_440px]">
            <div className="max-w-3xl pb-10 lg:pb-0">
              <AnimatePresence mode="wait">
               <motion.p key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .5 }} className="hero-kicker">
                <span /> Now showing · {properties[active].name} · {properties[active].location}
               </motion.p>
              </AnimatePresence>
              <h1 className="serif mt-7 text-[62px] font-semibold leading-[.84] tracking-[-.04em] sm:text-[82px] md:text-[110px] lg:text-[118px] xl:text-[132px]">
               <span className="block overflow-hidden"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ ...ease, delay: .05 }} className="block">Stay where</motion.span></span>
               <span className="block overflow-hidden"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ ...ease, delay: .18 }} className="block text-gold"><i>life slows down.</i></motion.span></span>
              </h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...ease, delay: .32 }} className="mt-8 max-w-xl text-[15px] leading-7 text-white/78 md:text-base">
                Thoughtfully designed stays for workdays, weekends and celebrations — with The Tree in Ravet, Hinjewadi Phase 3 and Lonavala.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...ease, delay: .42 }} className="mt-9 flex flex-wrap gap-3">
                <Link href="#enquiry" className="gold-button h-14 px-7">Plan your stay <ArrowUpRight size={17} /></Link>
                <Link href="#properties" className="glass-button h-14 px-7">Explore properties</Link>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...ease, delay: .55 }} className="mt-10 flex flex-wrap items-center gap-3">
               {properties.map((p, i) => <button key={p.slug} onClick={() => jumpTo(i)} className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[.14em] transition ${active === i ? 'border-gold bg-gold/15 text-gold' : 'border-white/15 text-white/55 hover:border-white/35 hover:text-white'}`}>
                <span className={`h-1.5 w-1.5 rounded-full transition ${active === i ? 'bg-gold' : 'bg-white/40'}`} />
                {p.name.replace('The Tree ', '')}
               </button>)}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 35, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ ...ease, delay: .25 }} className="hero-enquiry-card hidden lg:block">
              <div className="hero-enquiry-glow" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="eyebrow">Private enquiries</p>
                    <h2 className="serif mt-1 text-4xl font-semibold">Plan something special.</h2>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold"><Sparkles size={18} /></span>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/65">Tell us where you would like to stay and what you need. We will help you choose the right Tree.</p>
                <div className="mt-6 grid gap-3">
                  <Link href="#enquiry" className="hero-card-action">Send an enquiry <ArrowUpRight size={16} /></Link>
                  <a href={`https://wa.me/${mainContact.whatsapp}`} target="_blank" rel="noreferrer" className="hero-card-whatsapp"><MessageCircle size={17} /> Chat on WhatsApp</a>
                </div>
                <div className="mt-6 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.16em] text-white/45">
                  Ravet · Hinjewadi Phase 3 · Lonavala
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center text-[9px] uppercase tracking-[.35em] text-white/55">
          <ArrowDown className="mx-auto mb-2 animate-bounce" size={15} /> Discover The Tree
        </div>
      </section>

      <section className="trust-strip bg-forest text-white">
        <div className="container-x grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
          {[
            [ShieldCheck, 'Thoughtful hospitality', 'Warm service, considered details'],
            [MapPin, 'Three destinations', 'Pune convenience to Lonavala calm'],
            [Sparkles, 'Comfort-led stays', 'Rooms designed to help you switch off'],
            [MessageCircle, 'Easy enquiries', 'Talk to us directly before you book'],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof ShieldCheck;
            return <div key={title as string} className="px-5 py-7 first:pl-0 last:pr-0 md:px-7"><I size={21} className="text-gold" /><p className="mt-3 text-xs font-bold tracking-wide">{title as string}</p><p className="mt-1 text-[11px] leading-5 text-white/48">{text as string}</p></div>;
          })}
        </div>
      </section>

      <section className="relative bg-[#f7f4eb] py-24 md:py-32" id="properties">
        <div className="container-x">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} variants={reveal} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">One brand · three ways to stay</p>
            <h2 className="serif mt-3 text-5xl font-semibold leading-[.92] md:text-7xl">Choose your <i className="text-forest/65">perfect stay.</i></h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted">From business-friendly Pune stays to a slower Lonavala escape, each Tree property is shaped around the way you want to travel.</p>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-stretch">
            {properties.map((p, i) => <motion.div key={p.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ ...ease, delay: i * .1 }} className="h-full"><PropertyCard p={p} /></motion.div>)}
          </div>
        </div>
      </section>

      <section id="rooms" className="bg-white py-24 md:py-32">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={ease} className="relative h-[480px] overflow-hidden rounded-[34px] md:h-[610px]">
            <Image src="/images/lonavala/gallery-4.jpg" alt="Elegant hotel room at The Tree" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition duration-[1.5s] hover:scale-105" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-[#071f17]/82 p-5 text-white backdrop-blur-xl"><p className="eyebrow">Rooms & suites</p><p className="serif mt-1 text-3xl font-semibold">Sleep beautifully.</p></div>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}>
            <p className="eyebrow">Made for good mornings</p>
            <h2 className="serif mt-3 text-5xl font-semibold leading-[.92] md:text-7xl">Comfort that feels <i className="text-gold">effortless.</i></h2>
            <p className="mt-6 max-w-xl text-sm leading-8 text-muted">Clean lines, warm textures, comfortable beds and thoughtful essentials. Whether you are in town for work or leaving the city behind, your room should make switching off feel easy.</p>
            <div className="mt-9 grid grid-cols-2 gap-3">{['Deluxe Rooms', 'Executive Rooms', 'Premium Rooms', 'Family Suites'].map(x => <div key={x} className="group rounded-2xl border border-forest/10 bg-[#fbfaf6] p-4 transition hover:-translate-y-1 hover:border-gold/50"><p className="text-sm font-bold">{x}</p><span className="mt-2 block text-[11px] text-muted">Ask about availability <ArrowUpRight size={13} className="inline transition group-hover:translate-x-1 group-hover:-translate-y-1" /></span></div>)}</div>
            <Link href="#enquiry" className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-xs font-bold uppercase tracking-[.16em] text-white transition hover:-translate-y-1 hover:shadow-xl">Ask about rooms <ArrowUpRight size={15} /></Link>
          </motion.div>
        </div>
      </section>

      <section id="experiences" className="bg-forest py-24 text-white md:py-32">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="eyebrow">The Tree experience</p><h2 className="serif mt-3 text-5xl font-semibold leading-[.92] md:text-7xl">Little things.<br /><i className="text-gold">Done well.</i></h2></div><p className="max-w-xl text-sm leading-8 text-white/60">A stay is more than a room. It is convenient parking after a long drive, a good breakfast before a meeting, a comfortable place to gather, and a team you can reach when you need help.</p></div>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{[[Wifi, 'High-speed Wi-Fi'], [Utensils, 'Dining'], [Car, 'Parking'], [Mountain, 'Lonavala escape'], [ShieldCheck, 'Peace of mind'], [Clock3, 'Guest support']].map(([Icon, label]) => { const I = Icon as typeof Wifi; return <motion.div key={label as string} whileHover={{ y: -6 }} className="rounded-3xl border border-white/10 bg-white/[.045] p-5 text-center backdrop-blur"><I className="mx-auto text-gold" size={25} /><p className="mt-4 text-xs font-semibold text-white/85">{label as string}</p></motion.div>; })}</div>
        </div>
      </section>

      <section id="gallery" className="bg-[#f7f4eb] py-24 md:py-32">
        <div className="container-x"><motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}><p className="eyebrow">A glimpse of The Tree</p><h2 className="serif mt-3 max-w-3xl text-5xl font-semibold leading-[.92] md:text-7xl">Come for the stay.<br /><i className="text-forest/65">Leave with memories.</i></h2></motion.div>
         <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{curatedGallery.map((src, i) => <motion.button key={src} type="button" onClick={() => openLightbox(i)} initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ ...ease, delay: i * .06 }} className={`${i === 0 ? 'col-span-2 row-span-2 h-[500px] md:h-[650px]' : 'h-[245px] md:h-[320px]'} group relative overflow-hidden rounded-3xl`}><Image src={src} alt={`The Tree Hotels gallery ${i + 1}`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-1000 group-hover:scale-110" /><div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" /></motion.button>)}</div>
         <div className="mt-8 flex flex-wrap justify-center gap-3">{properties.map(p => <Link key={p.slug} href={`/properties/${p.slug}`} className="glass-button-dark h-12 px-6">{p.name.replace('The Tree ', '')} gallery <ArrowUpRight size={15} /></Link>)}</div>
        </div>
        {lightboxOpen && <GalleryLightbox items={curatedItems} index={lightboxIndex} onIndexChange={setLightboxIndex} onClose={() => setLightboxOpen(false)} />}
      </section>

      <section id="dining" className="relative overflow-hidden bg-[#eadfca] py-24 md:py-32"><div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center"><motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}><p className="eyebrow">Dining & gatherings</p><h2 className="serif mt-3 text-5xl font-semibold leading-[.92] md:text-7xl">Good food.<br /><i className="text-forest/70">Better company.</i></h2><p className="mt-6 max-w-lg text-sm leading-8 text-forest/65">Start with breakfast, settle into a relaxed lunch or make dinner part of the evening. Dining and event options can be tailored by property.</p><div className="mt-8 flex flex-wrap gap-2"><span className="pill">Breakfast</span><span className="pill">All-day dining</span><span className="pill">Celebrations</span><span className="pill">Gatherings</span></div></motion.div><motion.div initial={{ opacity: 0, x: 35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={ease} className="relative h-[430px] overflow-hidden rounded-[34px] shadow-2xl"><Image src="/images/lonavala/gallery-3.jpg" alt="Dining experience at The Tree" fill className="object-cover" /><div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-5 py-4 backdrop-blur"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-forest">Ask us about dining</p></div></motion.div></div></section>

      <section id="about" className="bg-white py-24 md:py-32"><div className="container-x"><div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_.9fr]"><motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}><p className="eyebrow">Why The Tree</p><h2 className="serif mt-3 text-5xl font-semibold leading-[.9] md:text-8xl">Hospitality with a <i className="text-gold">human touch.</i></h2></motion.div><motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={ease} className="lg:pt-10"><p className="text-base leading-8 text-muted">The Tree is built around a simple idea: a good stay should make your day easier. Comfortable rooms, considered spaces, warm service and convenient locations come together across our Pune properties and Lonavala escape.</p><div className="mt-10 grid grid-cols-3 gap-4 border-t border-forest/10 pt-7"><div><b className="serif text-5xl text-forest">3</b><span className="mt-1 block text-[10px] uppercase tracking-[.14em] text-muted">destinations</span></div><div><b className="serif text-5xl text-forest">24×7</b><span className="mt-1 block text-[10px] uppercase tracking-[.14em] text-muted">enquiry access</span></div><div><b className="serif text-5xl text-forest">1</b><span className="mt-1 block text-[10px] uppercase tracking-[.14em] text-muted">thoughtful promise</span></div></div></motion.div></div>
        <div className="mt-20 rounded-[34px] bg-[#f7f4eb] p-7 md:p-12"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Guest voice</p><h3 className="serif mt-2 text-4xl font-semibold md:text-5xl">The feeling we want you to take home.</h3></div><p className="max-w-md text-xs leading-6 text-muted">Sample marketing copy for the prototype. Replace these cards with verified guest reviews before launch.</p></div><div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3"><div className="review-card"><Sparkles className="text-gold" size={18} /><p>“A comfortable base for exploring Pune, with a calm setting to come back to after a busy day.”</p><span>Sample guest impression · Ravet</span></div><div className="review-card"><Sparkles className="text-gold" size={18} /><p>“A convenient stay for work and a comfortable place to slow down between meetings.”</p><span>Sample guest impression · Hinjewadi</span></div><div className="review-card"><Sparkles className="text-gold" size={18} /><p>“A weekend in Lonavala should feel unhurried — with room to breathe, eat well and simply relax.”</p><span>Sample guest impression · Lonavala</span></div></div></div>
      </div></section>

      <section id="offers" className="relative overflow-hidden bg-forest py-20 text-white md:py-28">
       <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
       <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold-2/10 blur-3xl" />
       <div className="container-x relative z-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} variants={reveal} className="mx-auto max-w-2xl text-center">
         <p className="eyebrow">Direct booking advantage</p>
         <h2 className="serif mt-3 text-5xl font-semibold leading-[.94] md:text-7xl">Offers made <i className="text-gold">for direct guests.</i></h2>
         <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">Enquire directly with the property and unlock the kind of flexibility that listing sites can't offer — no middleman, no markup.</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
         {[
          { icon: Percent, tag: 'Best rate promise', title: 'Direct booking rate', text: 'Enquire straight with the property and get the best rate we can offer — no OTA commission built into the price.' },
          { icon: Gift, tag: 'Celebrations', title: 'Custom celebration setup', text: 'Birthdays, anniversaries or a small get-together — tell us the occasion and we will help shape the stay around it.' },
          { icon: Users, tag: 'Group & long stays', title: 'Group & extended-stay plans', text: 'Travelling as a larger group or staying longer, especially at the Lonavala villas? Ask us for a plan that fits.' },
         ].map((o, i) => {
          const Icon = o.icon;
          return <motion.div key={o.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ ...ease, delay: i * .1 }} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[.04] p-7 transition hover:-translate-y-1.5 hover:border-gold/30 hover:bg-white/[.07]">
           <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold"><Icon size={20} /></span>
           <p className="mt-6 text-[10px] font-bold uppercase tracking-[.2em] text-gold">{o.tag}</p>
           <h3 className="serif mt-2 text-3xl font-semibold leading-tight">{o.title}</h3>
           <p className="mt-3 text-sm leading-6 text-white/55">{o.text}</p>
           <Link href="#enquiry" className="mt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold transition group-hover:gap-2.5">Ask about this <ArrowUpRight size={15} /></Link>
          </motion.div>;
         })}
        </div>

        <div className="mt-14 rounded-[34px] border border-gold/20 bg-gradient-to-br from-white/[.07] to-transparent p-8 md:p-14">
         <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="eyebrow">Talk to us first</p><h3 className="serif mt-2 text-4xl font-semibold md:text-5xl">Tell us what would make your stay better.</h3><p className="mt-4 max-w-xl text-sm leading-7 text-white/60">Ask about room options, property-specific experiences, celebrations, dining or direct-stay possibilities. We will help you plan the details.</p></div>
          <Link href="#enquiry" className="gold-button h-14 px-7">Start an enquiry <ArrowUpRight size={17} /></Link>
         </div>
        </div>
        <p className="mt-5 text-center text-[10px] text-white/30">Offers are indicative and confirmed directly with the property at the time of enquiry.</p>
       </div>
      </section>

      <Suspense fallback={null}><EnquiryForm /></Suspense>

      <footer className="bg-[#03120d] py-16 text-white">
       <div className="container-x">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-10 lg:flex-row lg:items-start lg:justify-between">
         <div className="max-w-sm"><div className="flex items-center gap-3"><span className="brand-mark"><TreeLogo size={18}/></span><div><b className="serif text-4xl">THE TREE</b><small className="block text-[8px] tracking-[.34em] text-gold">HOTELS · RESORTS</small></div></div><p className="mt-5 text-xs leading-7 text-white/45">Three destinations. One thoughtful approach to hospitality — Ravet, Hinjewadi Phase 3 and Lonavala.</p>
          {/* Add real Instagram / YouTube profile links here once you have them: re-import {Instagram, Youtube} from 'lucide-react' above, then un-comment: */}
          {/* <div className="mt-6 flex gap-3">{[[Instagram,'https://instagram.com/yourhandle'],[Youtube,'https://youtube.com/@yourhandle']].map(([Icon,url],i)=><a key={i} href={url as string} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-gold/50 hover:text-gold"><Icon size={16}/></a>)}</div> */}
         </div>
         <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
          <div><p className="footer-title">Explore</p><div className="mt-4 flex flex-col gap-3 text-xs text-white/55">{[['Properties','#properties'],['Rooms','#rooms'],['Experiences','#experiences'],['Gallery','#gallery'],['Dining','#dining']].map(([l,h])=><Link key={h} href={h} className="w-fit transition hover:text-gold">{l}</Link>)}</div></div>
          <div><p className="footer-title">Company</p><div className="mt-4 flex flex-col gap-3 text-xs text-white/55"><Link href="#about" className="w-fit transition hover:text-gold">About</Link><Link href="#offers" className="w-fit transition hover:text-gold">Offers</Link><Link href="#enquiry" className="w-fit transition hover:text-gold">Plan a stay</Link></div></div>
          <div className="col-span-2 sm:col-span-1"><p className="footer-title">Head office</p><p className="mt-4 flex items-start gap-2 text-xs leading-6 text-white/55"><MapPin size={14} className="mt-0.5 shrink-0"/> Pune & Lonavala, Maharashtra, India</p><a href="#enquiry" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-gold">Get in touch <ArrowUpRight size={13}/></a></div>
         </div>
        </div>

        <div className="pt-10"><p className="footer-title">Connect directly</p>
         <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">{properties.map(p=><div key={p.slug} className="rounded-2xl border border-white/10 bg-white/[.03] p-5 transition hover:border-gold/25"><b className="text-[11px] font-bold uppercase tracking-wide text-white/85">{p.name.replace('The Tree ', '')}</b><div className="mt-3 space-y-2 text-xs text-white/55"><a href={`tel:${p.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 transition hover:text-gold"><Phone size={13}/> {p.phone}</a><a href={`https://wa.me/${p.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-gold"><MessageCircle size={13}/> WhatsApp chat</a><a href={`mailto:${p.email}`} className="flex items-center gap-2 truncate transition hover:text-gold"><Mail size={13} className="shrink-0"/> <span className="truncate">{p.email}</span></a></div></div>)}</div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] text-white/30 md:flex-row">
         <span>© {new Date().getFullYear()} The Tree Hotels & Resorts.</span>
         <span>Designed by <span className="font-semibold text-gold/80">Shyam</span></span>
        </div>
       </div>
      </footer>
    </main>
  );
}
