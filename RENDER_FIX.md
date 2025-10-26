# Fix: 404 Error on Page Refresh on Render

## The Problem
When you refresh the website on any page (e.g., `/about`, `/products`), you get a "Not Found" error because Render doesn't know how to handle React Router routes.

## Solution: Configure Render for SPA Routing

### Option 1: Contact Render Support (Recommended)
The easiest way is to contact Render support to enable "Single Page App" mode for your static site:

1. Go to https://dashboard.render.com
2. Click on your static site
3. Click "Support" or "Help"
4. Send them this message:

```
Hi Render Team,

I have a React SPA deployed as a static site that uses React Router for client-side routing. 
Currently, when I refresh any page (like /about or /products), I get a 404 error.

Could you please enable "Single Page App" mode or configure the site to serve index.html 
for all routes?

My site URL: https://oaktimber-website.onrender.com

Thank you!
```

They should fix this quickly.

### Option 2: Manual Configuration (If Support Doesn't Help)

Go to your Render dashboard and try these steps:

1. Click on your static site
2. Go to **Settings**
3. Look for **Advanced** or **Build Settings**
4. Add a custom header:
   - Path: `/*`
   - Header name: `X-Rewrite-URL`
   - Header value: `/index.html`

Or try:
- Header name: `Content-Type`
- Header value: `text/html; charset=utf-8`

### Option 3: Switch to Vercel or Netlify (Fastest Solution)

If Render continues to give issues, consider switching to Vercel or Netlify which handle React Router out-of-the-box:

**Vercel:**
1. Go to https://vercel.com
2. Import your GitHub repository
3. Click Deploy
4. Done! No configuration needed.

**Netlify:**
1. Go to https://netlify.com
2. Import your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

Both Vercel and Netlify automatically handle React Router routing without any configuration.

## Current Status

Your files are configured correctly:
- ✅ `public/_redirects` file exists (for Netlify/Vercel)
- ✅ `render.yaml` exists (may not be used by Render)
- ✅ React Router is set up correctly
- ✅ ScrollToTop component is in place

The issue is Render-specific configuration.

## Verification

After applying the fix:
1. Navigate to https://oaktimber-website.onrender.com/about
2. Press F5 or Ctrl+R to refresh
3. The page should load correctly (not show 404)

Let me know once you've contacted Render support or switched hosting!
