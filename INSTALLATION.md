# The Tree Hotels — Installation

## Requirements
- Node.js 20.9+ recommended
- npm 10+

## 1. Extract and open

```bash
cd the-tree-hotel
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2. Email + WhatsApp

Copy `.env.example` to `.env.local`. The current prototype is preconfigured for the requested contact details:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=919604258627
NEXT_PUBLIC_ENQUIRY_EMAIL=shamyadav201000@gmail.com
```

The email enquiry uses FormSubmit AJAX, so no backend or API key is required. On the first submission, FormSubmit may ask the destination inbox to confirm/activate the form. WhatsApp opens a pre-filled enquiry message to the same hotel contact number.

## 3. Replace property data
Edit `src/data/properties.ts` with the real hotel phone, WhatsApp, addresses, room types and amenities.

## 4. Replace photos
Demo images currently use Unsplash URLs. Replace those URLs with the hotel's licensed photos before production.

## 5. Deploy
Push the project to GitHub and import it into Vercel. Add the same `.env.local` values in Vercel Project Settings > Environment Variables.

## Current scope
Frontend-only. No real booking database, payment processing, admin persistence or revenue storage yet. Those can be connected later without redesigning the public site.
