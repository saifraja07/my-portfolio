# Project previews and contact form

## Lightweight project previews

Project screenshots are stored as WebP to reduce transfer size. The current previews are already compressed; keep new screenshots reasonably sized (around 1200–1600px wide) and prefer WebP.

1. Put the image in `public/projects/`, for example `public/projects/browseros.webp`.
2. Open `src/data/projects.js`.
3. Set that project's `previewImage` to the public path, for example `previewImage: '/projects/browseros.webp'`.
4. Wide screenshots work best. The card image is lazy-loaded and decoded asynchronously.

Project details are available at `/projects/<project-id>`; IDs are the `id` values in `src/data/projects.js`.

## Contact form delivery

The contact form validates the name, email, and message, then submits to FormSubmit's AJAX endpoint for the email configured in `src/data/siteConfig.js`. FormSubmit is a third-party service and receives the submitted form data.

On the first submission, FormSubmit may email the recipient an activation link. **Open that email and activate the address** before expecting portfolio messages to arrive. The form displays an error if the service cannot accept a submission; test it with a real message before publishing.

The form includes a hidden honeypot and prevents rapid repeat submissions in the same page session. These are basic anti-spam measures, not a replacement for server-side abuse protection.

## Instagram

Set `social.instagram` in `src/data/siteConfig.js` to your actual profile URL, such as `https://www.instagram.com/your-handle/`. It appears in the Contact social icons and footer. Leave it empty until you have the correct profile URL; the link will remain inactive rather than pointing visitors to the wrong account.
