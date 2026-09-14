type EnquiryData = { name:string; phone:string; email:string; checkIn:string; checkOut:string; guests:string; message:string };
type PropertyLike = { name:string; location:string; phone:string; whatsapp:string };

const row = (label:string, value:string) =>
 `<tr><td style="padding:12px 0;border-bottom:1px solid #e9e4d8;color:#6b6558;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;width:130px;vertical-align:top">${label}</td><td style="padding:12px 0;border-bottom:1px solid #e9e4d8;color:#12241c;font-size:14px;vertical-align:top">${value || '—'}</td></tr>`;

export function buildEnquiryEmailHtml(property:PropertyLike, form:EnquiryData){
 return `<!doctype html><html><body style="margin:0;background:#f2efe6;font-family:Georgia,'Times New Roman',serif;">
 <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
  <div style="background:#0b2b1f;border-radius:20px 20px 0 0;padding:28px 32px;">
   <p style="margin:0;color:#d0aa62;font-size:10px;letter-spacing:.3em;text-transform:uppercase;font-family:Arial,sans-serif;">The Tree · Hotels &amp; Resorts</p>
   <h1 style="margin:8px 0 0;color:#ffffff;font-size:26px;font-weight:600;">New Stay Enquiry</h1>
   <p style="margin:6px 0 0;color:#ffffffb3;font-size:13px;font-family:Arial,sans-serif;">${property.name} · ${property.location}</p>
  </div>
  <div style="background:#ffffff;padding:28px 32px;border-radius:0 0 20px 20px;box-shadow:0 20px 45px rgba(11,43,31,.08);">
   <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">
    ${row('Guest name', form.name)}
    ${row('Phone', form.phone)}
    ${row('Email', form.email)}
    ${row('Check-in', form.checkIn)}
    ${row('Check-out', form.checkOut)}
    ${row('Guests', form.guests)}
    ${row('Request', form.message)}
   </table>
   <div style="margin-top:22px;display:flex;gap:10px;font-family:Arial,sans-serif;">
    <a href="tel:${form.phone}" style="flex:1;text-align:center;background:#0b2b1f;color:#fff;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:12px 0;border-radius:999px;">Call guest</a>
    <a href="mailto:${form.email}" style="flex:1;text-align:center;border:1px solid #0b2b1f;color:#0b2b1f;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:12px 0;border-radius:999px;">Reply by email</a>
   </div>
  </div>
  <p style="text-align:center;color:#8a8375;font-size:11px;margin-top:20px;font-family:Arial,sans-serif;">Sent from thetreehotels enquiry form · ${property.phone}</p>
 </div>
 </body></html>`;
}
