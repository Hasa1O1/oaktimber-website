# Deployment Guide for OAKTIMBER Website

This guide will help you deploy your OAKTIMBER website to the internet so customers can access it.

## Prerequisites

Before deploying, make sure:
- Your website works correctly locally (`npm run dev`)
- You have added your actual images
- You have updated all content with your information
- You have tested the contact form

## Recommended: Deploy to Netlify (Free & Easy)

Netlify is perfect for beginners and offers free hosting for static websites.

### Step 1: Create a GitHub Account

1. Go to https://github.com
2. Sign up for a free account
3. Verify your email

### Step 2: Install Git (if not already installed)

**Windows:**
1. Download from https://git-scm.com/download/win
2. Run the installer with default settings

**Mac:**
Git is usually pre-installed. Open Terminal and type `git --version` to check.

### Step 3: Push Your Code to GitHub

Open your terminal in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit - OAKTIMBER website"

# Create a new repository on GitHub (via website)
# Then connect and push:
git remote add origin https://github.com/YOUR-USERNAME/oaktimber-website.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Netlify

1. Go to https://netlify.com and sign up (use your GitHub account)
2. Click "Add new site" > "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your "oaktimber-website" repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"

Your site will be live in 2-3 minutes! 🎉

### Step 5: Custom Domain (Optional)

1. Purchase a domain from:
   - Namecheap (https://namecheap.com)
   - GoDaddy (https://godaddy.com)
   - Google Domains

2. In Netlify dashboard:
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Follow instructions to connect your domain

**Suggested domain names:**
- oaktimber.com
- oaktimbercraft.com
- oaktimberfurniture.com

## Alternative: Deploy to Vercel (Also Free)

Vercel is another excellent option, very similar to Netlify.

### Steps:

1. Push your code to GitHub (same as above)
2. Go to https://vercel.com and sign up
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite - just click "Deploy"

Done! Your site is live.

## Alternative: Deploy to GitHub Pages

GitHub Pages is free but requires a few extra steps for React apps.

### Steps:

1. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://YOUR-USERNAME.github.io/oaktimber-website",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/oaktimber-website/'
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

Visit: https://YOUR-USERNAME.github.io/oaktimber-website

## After Deployment Checklist

✅ Test all pages load correctly  
✅ Check mobile responsiveness  
✅ Test contact form  
✅ Verify all images display  
✅ Test all navigation links  
✅ Check social media links work  
✅ Test on different browsers (Chrome, Firefox, Safari)  
✅ Add website URL to business cards and social media  

## Setting Up Contact Form (Important!)

Your contact form needs a backend to work. Here are the easiest options:

### Option 1: Netlify Forms (Easiest - Recommended)

If you deployed to Netlify:

1. Open `src/pages/Contact.jsx`
2. Update the form tag to include Netlify attributes:
   ```jsx
   <form 
     onSubmit={handleSubmit} 
     className="space-y-6"
     name="contact"
     method="POST"
     data-netlify="true"
   >
     <input type="hidden" name="form-name" value="contact" />
     {/* rest of form */}
   </form>
   ```

3. Re-deploy your site
4. Form submissions will appear in Netlify dashboard under "Forms"
5. Set up email notifications in Netlify settings

### Option 2: Formspree (Works with any hosting)

1. Go to https://formspree.io and sign up (free plan available)
2. Create a new form and get your form endpoint
3. Update the form in `src/pages/Contact.jsx`:
   ```jsx
   <form 
     action="https://formspree.io/f/YOUR-FORM-ID"
     method="POST"
     className="space-y-6"
   >
   ```

### Option 3: EmailJS (Works with any hosting)

1. Go to https://emailjs.com and sign up
2. Set up your email service
3. Install EmailJS package: `npm install @emailjs/browser`
4. Update the form handler in Contact.jsx to use EmailJS
5. Re-deploy

## Updating Your Website

To update your website after making changes:

### With Netlify or Vercel:
```bash
git add .
git commit -m "Updated content"
git push
```

Your site will automatically rebuild and update!

### With GitHub Pages:
```bash
npm run deploy
```

## Custom Email Address

Consider getting a professional email address like:
- info@oaktimber.com
- dingani@oaktimber.com

**Where to get:**
- Google Workspace (formerly G Suite) - $6/month
- Zoho Mail - Free for up to 5 users
- Your domain registrar often includes email

## Website Analytics (Optional but Recommended)

Track your visitors with Google Analytics:

1. Go to https://analytics.google.com
2. Set up a new property for your website
3. Get your tracking ID
4. Add tracking code to `index.html`

This helps you understand:
- How many people visit your site
- Which pages are most popular
- Where visitors come from
- What devices they use

## SEO Optimization

To help customers find you on Google:

1. **Submit to Google Search Console:**
   - https://search.google.com/search-console
   - Add your website
   - Submit your sitemap

2. **Update meta tags** in `index.html`:
   ```html
   <meta name="description" content="Your actual business description">
   <meta name="keywords" content="carpentry, furniture, Zambia, etc">
   ```

3. **Create social media profiles** with your website link
4. **Get listed on:** Google Business, local directories

## Getting Help

If you run into issues:

1. **Netlify/Vercel Issues:** Check their status pages and documentation
2. **Build Errors:** Check the build log in the deployment dashboard
3. **Image Issues:** Verify file paths and that images are in the `public` folder
4. **Form Issues:** Check the console in browser developer tools

## Costs Summary

**Free Options:**
- Netlify hosting: FREE
- Vercel hosting: FREE
- GitHub Pages: FREE
- Formspree (100 submissions/month): FREE
- Basic SSL certificate: FREE (included)

**Paid Options (Optional):**
- Custom domain: $10-15/year
- Professional email: $6-12/month
- Premium form service: $10+/month

## Next Steps After Deployment

1. ✅ Share your website URL on social media
2. ✅ Add to business cards and marketing materials
3. ✅ Update WhatsApp business profile
4. ✅ Create Facebook/Instagram business pages
5. ✅ Set up Google Business Profile
6. ✅ Start collecting customer testimonials
7. ✅ Take more photos of your work
8. ✅ Regularly update gallery with new projects

---

**Congratulations on launching your website! 🚀**

Your professional online presence will help attract more customers and grow your business.

