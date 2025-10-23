# 🚀 Quick Start Guide - OAKTIMBER Website

Get your website up and running in 5 minutes!

## Step 1: Install Dependencies (2 minutes)

Open your terminal in this folder and run:

```bash
npm install
```

This downloads all the necessary packages. You'll see a progress bar - wait for it to complete.

**What this does:** Installs React, Tailwind CSS, and other tools needed to run the website.

---

## Step 2: Start the Development Server (30 seconds)

Run this command:

```bash
npm run dev
```

**What happens next:**
- Your default browser will open automatically
- You'll see the OAKTIMBER website
- The address will be: `http://localhost:3000`

**Keep this terminal window open!** The website runs as long as this is running.

---

## Step 3: View Your Website

The website should open automatically, but if not:

1. Open your web browser
2. Go to: `http://localhost:3000`
3. Click around and explore!

**Pages to check:**
- Home (landing page)
- About (company story)
- Products & Services (what you offer)
- Gallery (portfolio showcase)
- Contact (contact form)

---

## Step 4: Make Your First Edit (1 minute)

Let's change the main headline on the home page:

1. Open this file in your editor: `src/pages/Home.jsx`
2. Find line 50 (look for "Crafting Timeless")
3. Change the text to anything you want
4. **Save the file** (Ctrl+S or Cmd+S)
5. Look at your browser - it updates automatically! ✨

**Magic!** The dev server auto-reloads when you save changes.

---

## Step 5: Add Your First Image (2 minutes)

1. Find a photo of your work
2. Copy it to: `public/images/`
3. Name it something simple like: `hero.jpg`

Now let's use it:

4. Open `src/pages/Home.jsx`
5. Find the hero image section (around line 85)
6. Replace the placeholder with your image path
7. Save and check your browser!

---

## What's Next?

Now you're ready to customize! Follow these guides in order:

### For Content Updates:
📖 **Read: CUSTOMIZATION.md**
- Update all text content
- Add products and services
- Update contact information
- Add gallery images

### For Adding Your Images:
📷 **Read: public/images/README.md**
- Image size guidelines
- Where to place images
- How to optimize photos

### When Ready to Launch:
🚀 **Read: DEPLOYMENT.md**
- Deploy to Netlify (free)
- Set up custom domain
- Configure contact form
- Go live!

---

## Common Commands

```bash
# Start development server
npm run dev

# Stop the server
# Press: Ctrl+C (Windows/Linux) or Cmd+C (Mac)

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Troubleshooting

### "Command not found: npm"
**Problem:** Node.js is not installed  
**Solution:** Download and install from https://nodejs.org

### Port 3000 already in use
**Problem:** Something else is running on that port  
**Solution:** Close other dev servers or change port in `vite.config.js`

### Changes not showing
**Solution:** 
1. Make sure you saved the file (Ctrl+S)
2. Check the terminal for errors
3. Refresh browser (Ctrl+R)
4. Restart dev server (Ctrl+C, then `npm run dev`)

### White screen or errors
**Solution:**
1. Check terminal for error messages
2. Check browser console (press F12)
3. Undo your last change
4. Restart dev server

---

## Need Help?

1. **Read the comments** in code files - they explain everything
2. **Check README.md** for detailed information
3. **See CUSTOMIZATION.md** for how to update content
4. **Review PROJECT_OVERVIEW.md** for complete project details

---

## Quick Reference

| File | What It Does |
|------|--------------|
| `src/pages/Home.jsx` | Home page content |
| `src/pages/About.jsx` | About page content |
| `src/pages/Products.jsx` | Products/services |
| `src/pages/Gallery.jsx` | Portfolio gallery |
| `src/pages/Contact.jsx` | Contact form |
| `src/components/layout/Header.jsx` | Top navigation |
| `src/components/layout/Footer.jsx` | Bottom footer |
| `tailwind.config.js` | Colors and styling |
| `public/images/` | All your photos |

---

## Ready to Customize?

Now that you have the website running:

✅ Start by reading through each page in your browser  
✅ Check how it looks on mobile (resize your browser)  
✅ Then open CUSTOMIZATION.md and start updating content  
✅ Add your photos to the images folder  
✅ When ready, follow DEPLOYMENT.md to go live  

---

**You're all set! Happy customizing! 🎨**

Remember: Make small changes, save often, and test frequently. You've got this! 💪

