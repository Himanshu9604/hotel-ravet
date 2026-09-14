# Adding your real property photos

Right now the site uses stock (Unsplash) placeholder photos so it looks complete
during development. To swap in your own photography:

## 1. Drop your images into the right folder

```
public/images/ravet/
public/images/hinjewadi-phase-3/
public/images/lonavala/
```

Recommended files per folder (use these exact names so the code picks them up
with the smallest edits):

- `hero.jpg` — the main banner photo for that property (landscape, ideally
  1800×1200px or larger, under ~500KB after compression)
- `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg` ... — extra photos for
  that property (rooms, pool, dining, exterior, villa interiors etc.)

JPG or WebP both work. Keep filenames lowercase, no spaces (use hyphens).

## 2. Every place an image is used in the code

| # | What it is | File | Around line |
|---|---|---|---|
| 1 | Property hero photo (used in hero rotation, property card, property detail page banner, and the enquiry form steps 1 & 3) | `src/data/properties.ts` | Ravet ~15, Hinjewadi ~31, Lonavala ~47 (`image:` field) |
| 2 | Homepage gallery grid ("A glimpse of The Tree") | `src/app/page.tsx` | `id="gallery"` section, ~line 157 (array of photo ids) |
| 3 | Homepage "Rooms" section big photo | `src/app/page.tsx` | ~line 136 |
| 4 | Homepage "Dining" section photo | `src/app/page.tsx` | `id="dining"` section, ~line 160 |
| 5 | WhatsApp / social share preview image | `src/app/layout.tsx` | `openGraph.images`, ~line 21 |

For #1, change the `image:` value from the Unsplash URL to your local path:

```ts
image: '/images/ravet/hero.jpg',
```

Do the same for `hinjewadi-phase-3` and `lonavala`. The path always starts
with `/images/...` (not `/public/images/...` — Next.js serves everything
inside `public/` from the site root automatically).

For #2 (the gallery), replace the array of Unsplash photo ids with your own
local paths, e.g.:

```ts
['/images/lonavala/gallery-1.jpg', '/images/ravet/gallery-1.jpg', ...]
```

For #3, #4 and #5, just replace the single `src="..."` (or `url:` for #5)
with your own local path the same way.

## 3. Image size tips

- Compress photos before adding them (e.g. https://squoosh.app) — large
  unoptimized photos will slow the site down.
- Landscape orientation works best for `hero.jpg` (roughly 3:2 or 16:10
  ratio). Very tall/portrait images will get cropped by the layout.
- For #5 (share preview), 1200×630px is the standard size WhatsApp/Facebook
  expect.

Once real photos are in place, you can also remove the small "Demo imagery
for the prototype" note under the gallery section in `page.tsx`.
