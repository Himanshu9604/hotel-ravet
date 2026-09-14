# The Tree Hotels & Resorts — Premium Frontend V4

Premium Next.js frontend concept for three properties:
- The Tree Hotel Ravet
- The Tree Hotel Hinjewadi Phase 3
- The Tree Resort Lonavala

## Stack
Next.js + TypeScript + Tailwind CSS v4 + shadcn/ui setup + Zustand + Framer Motion + Lucide React.

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Enquiries
The enquiry form is configured for:
- Email: shamyadav201000@gmail.com
- WhatsApp: +91 96042 58627

Copy `.env.example` to `.env.local` if you want to override them.

Email uses FormSubmit AJAX. On the first live submission, FormSubmit can send a confirmation/activation email to the destination inbox. WhatsApp creates a pre-filled enquiry containing guest, property, date, guest-count and request details.

## Design changes in V4
- Removed the booking/search bar directly below the hero.
- `Plan your stay` scrolls directly to the premium enquiry section.
- Added a desktop hero enquiry card with Email + WhatsApp CTAs.
- Reworked enquiry form into a luxury concierge-style layout.
- Improved navbar and footer visual hierarchy.
- Replaced the old bird chevrons with recognizable filled bird silhouettes and animated wing-flap flight paths.
- Added marketing-led copy for Ravet, Hinjewadi Phase 3 and Lonavala.
- Kept guest reviews explicitly marked as sample copy until verified reviews are supplied.
- Mobile-first responsive behavior is preserved.

## Before production
Replace demo Unsplash imagery with licensed official hotel photography and replace any sample marketing/review text with verified hotel information.
