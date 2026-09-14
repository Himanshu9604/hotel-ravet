export type MealPlan = { pricePerPerson:string; note:string; hiTea:string[]; dinner:string[]; breakfast:string[] };
export type GalleryItem = { type:'image'|'video'; src:string };
export type Property = { slug:string; name:string; location:string; tagline:string; description:string; image:string; phone:string; whatsapp:string; email:string; address:string; mapUrl?:string; highlights:string[]; rooms:string[]; amenities:string[]; mealPlan?:MealPlan; gallery:GalleryItem[] };

// NOTE: 9579512341 is a placeholder/testing WhatsApp number used only while we set up
// automated replies. Swap TEST_WHATSAPP below for the real Hinjewadi number when ready.
const TEST_WHATSAPP = '919579512341';

// Helper to build gallery arrays from the exact filenames actually present in
// public/images/<slug>/ — keeps this file readable instead of listing 15 lines by hand.
const img = (path:string):GalleryItem => ({ type:'image', src:path });
const vid = (path:string):GalleryItem => ({ type:'video', src:path });

const ravetGallery:GalleryItem[] = [1,2,3,4,5,6,7,8,10,11,12,13,16].map(n=>img(`/images/ravet/gallary-${n}.jpg`));
ravetGallery.push(vid('/images/ravet/gallary-15.mp4'));

const hinjewadiGallery:GalleryItem[] = [1,2,3,4,5,6,7,8,9].map(n=>img(`/images/hinjewadi-phase-3/gallary-${n}.jpg`));

const lonavalaGallery:GalleryItem[] = [1,2,3,4,5,7,8,9,10,11,12,13].map(n=>img(`/images/lonavala/gallery-${n}.jpg`));
lonavalaGallery.push(vid('/images/lonavala/gallery-14.mp4'));

export const properties: Property[] = [
 {
  slug:'ravet',
  name:'The Tree Hotel Ravet',
  location:'Ravet, Pune',
  tagline:'Urban comfort, rooted in calm.',
  description:'A refined city stay near Pune with contemporary rooms, warm hospitality and easy access to Hinjewadi and the expressway.',
  image:'/images/ravet/hero.jpg',
  phone:'+91 93719 62999',
  whatsapp:'919371962999',
  email:'hotelthetreeravet@gmail.com',
  address:'Ravet, Pune, Maharashtra',
  mapUrl:'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('The Tree Hotel Ravet, Ravet, Pune, Maharashtra'),
  highlights:['Contemporary rooms','Restaurant & dining','Easy city access'],
  rooms:['Deluxe Room','Executive Room','Premium Room'],
  amenities:['Wi-Fi','Air Conditioning','Parking','Restaurant','Room Service','Conference Space'],
  gallery:ravetGallery
 },
 {
  slug:'hinjewadi-phase-3',
  name:'The Tree Hotel Hinjewadi',
  location:'Hinjewadi Phase 3, Pune',
  tagline:'Stay close to what moves you.',
  description:'A smart, stylish base for business travellers and weekend stays, designed around comfort, connectivity and convenience.',
  image:'/images/hinjewadi-phase-3/hero.jpg',
  phone:'+91 95795 12341',
  whatsapp:TEST_WHATSAPP,
  email:'Hotelthetree1@gmail.com',
  address:'Hinjewadi Phase 3, Pune, Maharashtra',
  mapUrl:'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('The Tree Hotel Hinjewadi Phase 3, Pune, Maharashtra'),
  highlights:['Business-friendly stay','Modern rooms','Fast connectivity'],
  rooms:['Deluxe Room','Business Room','Suite'],
  amenities:['Wi-Fi','AC','Parking','Breakfast','Room Service','Meeting Room'],
  gallery:hinjewadiGallery
 },
 {
  slug:'lonavala',
  name:'The Tree Resort Lonavala',
  location:'Lonavala, Maharashtra',
  tagline:'A slower kind of luxury.',
  description:'A nature-led escape for long weekends, celebrations and quiet mornings surrounded by the hills of Lonavala. Choose from private 5 BHK & 3 BHK villas or a cosy private cottage — every stay is exclusively yours, with the resort swimming pool shared across all guests.',
  image:'/images/lonavala/hero.jpg',
  phone:'+91 80079 91933',
  whatsapp:'918007991933',
  email:'thetreeresortlonavala@gmail.com',
  address:'Old Mumbai–Pune Highway, Behind Sant Tukaram Temple, Maval, Waksai, Lonavala – 410403',
  mapUrl:'https://www.google.com/maps/place/The+Tree+Resort+Lonavala/@18.760408,73.4511174,17z',
  highlights:['5 BHK & 3 BHK private villas','Private cottages','Shared resort swimming pool'],
  rooms:['5 BHK Villa · 5 Bedrooms, Living Hall, Kitchen, Private Jacuzzi','3 BHK Villa · Private & spacious','Private Cottage · Cosy & self-contained'],
  amenities:['Wi-Fi','Shared Swimming Pool','Private Jacuzzi (5 BHK Villa)','Fully Equipped Kitchen','Restaurant / In-house Dining','Parking','Room Service','Outdoor Spaces'],
  mealPlan:{
   pricePerPerson:'₹1,499',
   note:'Per person, villa stay · Hi-Tea, Dinner & Breakfast included. Lunch decided separately on the day; extra vegetable choices available for ₹300.',
   hiTea:['Sandwich / Pakoda','Tea & Coffee'],
   dinner:['2 Starters','Dum Aloo or Paneer Masala','Mix Veg Mushroom','Dal Tadka','Jeera Rice','Chapati','Gulab Jamun','Papad, Salad & Chaas'],
   breakfast:['Poha','Upma','Bread Butter Jam','Tea & Coffee']
  },
  gallery:lonavalaGallery
 }
];
export const getProperty=(slug:string)=>properties.find(p=>p.slug===slug);
