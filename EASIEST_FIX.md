# Easiest Fix: Add Headers to Render

## Follow These Steps

### Step 1: Go to Render Dashboard
1. Go to: https://dashboard.render.com
2. Log in

### Step 2: Open Your Website Settings
1. Find "oaktimber-website" in the list
2. Click on it
3. Click on **"Settings"** tab (at the top)

### Step 3: Find "Headers" Section
Scroll down in Settings until you find a section called:
- **"Headers"** or **"Response Headers"** or **"Custom Headers"**

It might look like this:
```
Headers
Add custom headers to your static site
```

### Step 4: Add a New Header
Click **"Add Header"** or **"New Header"** button

Fill in the form with:
- **Path Pattern:** `/*`
- **Header Name:** `X-Rewrite-URL`
- **Header Value:** `/index.html`

OR try this combination:
- **Path Pattern:** `/*`
- **Header Name:** `X-Fallback-URL`
- **Header Value:** `/index.html`

### Step 5: Save
Click **"Save"** or **"Save Changes"**

### Step 6: Wait for Deployment
- Render will redeploy automatically
- Takes 2-3 minutes
- You'll see a notification

### Step 7: Test
1. Go to: https://oaktimber-website.onrender.com/products
2. Press F5 to refresh
3. Should work! ✅

## If You Can't Find Headers Section

If you don't see a "Headers" option in Settings, try these alternatives:

### Alternative 1: Check if you have "Advanced" or "Build Settings"
Look for sections like:
- Build Settings
- Advanced Settings
- Environment Variables
- Custom Headers

### Alternative 2: Create a `_redirects` file (we already have one!)
We already created a `public/_redirects` file with:
```
/*    /index.html   200
```

This should already be working! If it's not, you might need to:
1. Make sure the file is in your `dist` folder after build
2. Clear your browser cache
3. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Alternative 3: Contact Render Support
If nothing works, contact Render support:
1. Go to: https://dashboard.render.com
2. Click "Help" or "Support"
3. Tell them: "I have a React SPA with client-side routing. When I refresh pages like /products, I get a 404 error. Can you help enable SPA mode or add rewrite rules?"

## Current Status

What we've already done:
- ✅ Created `server.js` (Express server)
- ✅ Added `_redirects` file
- ✅ Updated `package.json` with Express
- ✅ Installed Express
- ✅ Added `start` script

What Render needs:
- Either convert to Web Service OR
- Add headers OR
- Support the `_redirects` file

Try the headers method first - it's the easiest!
