'use client';
import { create } from 'zustand';
type BookingState={property:string;checkIn:string;checkOut:string;guests:string;set:(key:keyof Omit<BookingState,'set'>,value:string)=>void;reset:()=>void};
export const useBookingStore=create<BookingState>((set)=>({property:'',checkIn:'',checkOut:'',guests:'2 Guests',set:(key,value)=>set({[key]:value} as Partial<BookingState>),reset:()=>set({property:'',checkIn:'',checkOut:'',guests:'2 Guests'})}));
