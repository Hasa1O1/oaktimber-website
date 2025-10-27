# Step-by-Step Guide: Fix 404 on Render

## What You Need to Do

### 1. Open Render Dashboard
- Go to: https://dashboard.render.com
- Log in with your account

### 2. Find Your Website
- Look for "oaktimber-website" in the list
- Click on it to open

### 3. Go to Settings Tab
At the top of the page, you'll see tabs like:
- **Overview** | **Events** | **Environment** | **Settings**

Click on **"Settings"** (should be on the far right)

### 4. Scroll Down to "Service Type" or "Runtime"
You'll see something like:
```
Service Type: Static Site
```

Look for options to change it. You might see a dropdown or button that says "Convert to Web Service" or similar.

**What to do:**
- If there's a **"Convert to Web Service"** button → Click it
- OR find "Service Type" dropdown → Change to "Web Service"

### 5. Update Commands (Very Important!)
Scroll down to find these settings:

**Build Command:**
Change to: `npm run build`

**Start Command:**
Change to: `npm start`

**Root Directory:**
Leave as: `./` (or blank)

### 6. Save Changes
Click the **"Save"** or **"Save Changes"** button (usually at the bottom of the page)

### 7. Wait for Deployment
- You'll see a notification that changes are being applied
- This takes 3-5 minutes
- You'll see logs showing the build progress

### 8. Test Your Site
Once deployment is complete:
1. Go to: https://oaktimber-website.onrender.com/products
2. Press **F5** to refresh
3. ✅ Should work without 404 error!

## Alternative: If You Can't Find "Convert to Web Service"

If you don't see a way to convert the service type, try this:

### Option A: Create New Web Service
1. Click "New" button in Render dashboard
2. Select "Web Service"
3. Connect to your GitHub repo (oaktimber-website)
4. Settings:
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. Click "Create Web Service"

Then you can delete the old static site after testing.

### Option B: Try Headers First (Easier)
1. Stay in Settings
2. Look for "Headers" section
3. Add new header:
   - Path: `/*`
   - Name: `X-Rewrite-URL` or `X-Fallback-URL`
   - Value: `/index.html`
4. Save and test

## Troubleshooting

**"I can't find Settings"**
- Make sure you clicked on the service itself (not the dashboard home)
- Look for a gear icon ⚙️

**"I don't see 'Convert to Web Service'"**
- Some accounts have different layouts
- Try the Headers option instead
- Or create a new Web Service (see Option A above)

**"The deployment fails"**
- Check the build logs
- Make sure `npm start` is in your package.json (we already added it)
- Make sure Express is installed (we already did this)

Let me know which step you're on or if you're stuck somewhere!
