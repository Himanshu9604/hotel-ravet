import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getProperty } from '@/data/properties';
import { buildEnquiryEmailHtml } from '@/lib/email-template';

// Each property sends from its OWN Gmail inbox, using an App Password (not the normal
// Gmail password — Google blocks plain-password SMTP). Set these in .env.local:
//   SMTP_USER_RAVET / SMTP_PASS_RAVET
//   SMTP_USER_HINJEWADI_PHASE_3 / SMTP_PASS_HINJEWADI_PHASE_3
//   SMTP_USER_LONAVALA / SMTP_PASS_LONAVALA
// How to generate an App Password: Google Account -> Security -> 2-Step Verification
// (turn on) -> App Passwords -> create one for "Mail" -> paste the 16-char code here.
function envKey(slug:string){ return slug.toUpperCase().replace(/-/g,'_'); }

export async function POST(req:Request){
 try{
  const body = await req.json();
  const { name, phone, email, propertySlug, checkIn, checkOut, guests, message } = body;
  const property = getProperty(propertySlug);
  if(!property) return NextResponse.json({success:false,error:'Please choose a property.'},{status:400});
  if(!name || !phone || !email) return NextResponse.json({success:false,error:'Missing required fields.'},{status:400});

  const key = envKey(property.slug);
  const user = process.env[`SMTP_USER_${key}`];
  const pass = process.env[`SMTP_PASS_${key}`];

  if(!user || !pass){
   // Not configured yet — caller falls back to the WhatsApp button instead.
   return NextResponse.json({success:false,error:`Email isn't set up yet for ${property.name}.`},{status:503});
  }

  const transporter = nodemailer.createTransport({ service:'gmail', auth:{ user, pass } });
  await transporter.sendMail({
   from: `"${property.name}" <${user}>`,
   to: property.email,
   replyTo: email,
   subject: `New Stay Enquiry — ${property.name} (${name})`,
   html: buildEnquiryEmailHtml(property, { name, phone, email, checkIn, checkOut, guests, message })
  });

  return NextResponse.json({success:true});
 }catch(err){
  console.error('enquiry send failed', err);
  return NextResponse.json({success:false,error:'Could not send the enquiry email.'},{status:500});
 }
}
