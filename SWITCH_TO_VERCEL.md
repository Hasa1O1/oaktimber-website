# Deploy to Vercel - Quick Fix for 404 Error

## Why Vercel?
- ✅ Automatically handles React Router (no configuration needed)
- ✅ Free hosting
- ✅ Automatic deployments from GitHub
- ✅ Fast CDN worldwide
- ✅ Perfect for React apps

## Step-by-Step Guide

### Step 1: Sign up for Vercel
1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub repositories

### Step 2: Import Your Project
1. After signing up, you'll see a dashboard
2. Click **"Add New Project"** or **"Import Project"**
3. You'll see a list of your GitHub repositories
4. Find **"oaktimber-website"** and click **"Import"**

### Step 3: Configure Build Settings (Auto-detected)
Vercel will automatically detect your Vite project. The settings should be:
- **Framework Preset:** Vite
- **Root Directory:** `./` (leave default)
- **Build Command:** `npm run build` (should be auto-filled)
- **Output Directory:** `dist` (should be auto-filled)
- **Install Command:** `npm install` (should be auto-filled)

**Don't change anything** - just click **"Deploy"**

### Step 4: Wait for Deployment
- Vercel will install dependencies, build your project, and deploy
- Takes 2-3 minutes
- You'll see the build logs in real-time

### Step 5: Your Site is Live!
Once deployment is complete, you'll get a URL like:
- `https://oaktimber-website-xxxxx.vercel.app`

You can also customize it to just use your repository name.

### Step 6: Test the Fix
1. Go to your Vercel site URL
2. Navigate to any page (e.g., `/products`)
3. **Refresh the page** (F5)
4. ✅ It should work! No 404 error!

## After Deployment

### Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain (if you have one)
4. Vercel provides free SSL certificates automatically

### Automatic Updates
Every time you push to GitHub, Vercel will automatically:
- Detect the changes
- Rebuild your site
- Deploy the update

No manual intervention needed!

## Comparison: Render vs Vercel

| Feature | Render | Vercel |
|---------|--------|--------|
| React Router Support | Requires configuration | ✅ Automatic |
| Build Speed | Good | ⚡ Very Fast |
| Global CDN | Good | ✅ Excellent |
| Ease of Use | Medium | ✅ Very Easy |
| Free Tier | ✅ Yes | ✅ Yes |

## Next Steps

Once your site is on Vercel:
1. Test all pages (home, about, products, gallery, contact)
2. Test refreshing on each page
3. Test mobile responsiveness
4. Share your new Vercel URL on social media
5. Update your Render URL if people are already using it

## Need Help?

If you run into any issues:
1. Check the Vercel build logs
2. Make sure your GitHub repository is public
3. Verify the build command is `npm run build`
4. Verify the output directory is `dist`

Let me know once you've deployed to Vercel!
