# The Core Room — Static Website

This is a **static** (no backend) website scaffold focused on design + images.
Bookings are handled by **Arketa** (external link or embedded iframe).

## What to edit first
1) Replace the placeholder booking link:
- Search for `https://YOUR-ARKETA-LINK` in the project and paste your Arketa booking URL.

2) Replace social links:
- Search for `YOURHANDLE` and update Instagram/TikTok (or remove icons).

3) Add your images
Put images inside `/assets/` and replace these placeholders:
- `hero.mp4` + `hero-poster.jpg` (optional)
- `studio.jpg`
- `card-1.jpg` … `card-4.jpg`
- `about.jpg`
- `team-1.jpg` … `team-3.jpg`

> If you don’t have a hero video, delete the <video> tag and use an <img> instead.

## Run locally (no Node needed)
Option A (recommended): VS Code “Live Server” extension.

Option B (macOS built-in):
1. Open Terminal in this folder
2. Run:
   python3 -m http.server 8080
3. Visit:
   http://localhost:8080

## Deploy
- Netlify / Vercel static / Cloudflare Pages: upload the folder as-is.
- Namecheap / shared hosting: upload all files to `public_html`.

## Optional Arketa embed
If Arketa provides an embed snippet:
- Paste it into `classes.html` inside the “Optional: embed Arketa…” section.
- If it’s an iframe, you can keep it like:

<iframe src="YOUR-ARKETA-LINK" style="width:100%;height:900px;border:0;border-radius:16px;"></iframe>

## Colors
Main palette is set in `css/styles.css` under `:root`:
- Background: #ead9c9
- Brown: #6b3f2a
- Dark brown: #4a2a1d
