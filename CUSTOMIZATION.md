# Customization Guide for OAKTIMBER Website

This guide explains how to update content on your website. As requested, all instructions are written for beginners with step-by-step explanations. [[memory:3605409]]

## Table of Contents

1. [Updating Text Content](#updating-text-content)
2. [Adding/Removing Products](#addingremoving-products)
3. [Updating Contact Information](#updating-contact-information)
4. [Adding Gallery Images](#adding-gallery-images)
5. [Changing Colors](#changing-colors)
6. [Updating Testimonials](#updating-testimonials)

---

## Updating Text Content

### Home Page

**File to edit:** `src/pages/Home.jsx`

**To change the main headline:**
1. Open `src/pages/Home.jsx` in your code editor
2. Find this section (around line 50):
   ```jsx
   <h1 className="text-primary-900 leading-tight">
     Crafting Timeless
     <span className="block text-primary-600">Wooden Masterpieces</span>
   </h1>
   ```
3. Change the text between `>` and `<` to your desired headline
4. Save the file

**To change the tagline (the paragraph below headline):**
1. Find this section (around line 54):
   ```jsx
   <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
     Transform your space with handcrafted furniture...
   </p>
   ```
2. Replace the text with your own message
3. Save the file

### About Page

**File to edit:** `src/pages/About.jsx`

**To change the company story:**
1. Open `src/pages/About.jsx`
2. Scroll to the "Our Story" section (around line 90)
3. Find the paragraphs inside `<p>` tags
4. Replace the text with your actual business story
5. You can add more paragraphs by copying a `<p>` section
6. Save the file

**Example:**
```jsx
<p>
  Your actual company story here. Tell customers how you started,
  what inspired you, and what makes your business special.
</p>
```

---

## Adding/Removing Products

### Adding a New Product

**File to edit:** `src/pages/Products.jsx`

1. Open `src/pages/Products.jsx` in your editor
2. Find the `products` array (around line 25)
3. Copy an existing product object (everything between `{` and `},`)
4. Paste it at the end of the list
5. Update the details:

```jsx
{
  id: 10,  // Change to next number
  name: 'Your Product Name',  // Product name
  category: 'furniture',  // Choose: furniture, installations, or services
  description: 'Description of your product',  // What it is
  features: [  // List of features/benefits
    'Feature 1',
    'Feature 2',
    'Feature 3',
    'Feature 4'
  ],
  image: '/images/your-image.jpg',  // Path to product image
},
```

6. Save the file

### Removing a Product

1. Find the product you want to remove in the `products` array
2. Delete the entire object from `{` to `},` (including the comma)
3. Save the file

**Important:** Make sure not to delete any commas between other products!

---

## Updating Contact Information

### Changing Phone Number or Email

**File to edit:** `src/components/layout/Footer.jsx` and `src/pages/Contact.jsx`

**In Footer.jsx:**
1. Open `src/components/layout/Footer.jsx`
2. Find the phone section (around line 75):
   ```jsx
   <a href="tel:0973131425" className="...">
     0973 131 425
   </a>
   ```
3. Change both instances of the phone number
4. Do the same for the email (around line 84)

**In Contact.jsx:**
1. Open `src/pages/Contact.jsx`
2. Find the contact information section (around line 170)
3. Update phone, email, and owner name as needed

### Updating Business Hours

**File to edit:** `src/pages/Contact.jsx`

1. Open the file and find the "Business Hours" section (around line 220)
2. Change the hours in each row:
   ```jsx
   <div className="flex justify-between">
     <span className="text-gray-600">Monday - Friday</span>
     <span className="font-medium text-gray-900">8:00 AM - 6:00 PM</span>
   </div>
   ```
3. Update the times as needed
4. Save the file

### Updating Social Media Links

**File to edit:** `src/components/layout/Footer.jsx`

1. Open the file and find the social media section (around line 95)
2. Replace `#` with your actual social media URLs:
   ```jsx
   <a href="https://facebook.com/your-page" ...>
   ```

**To add your Facebook page:**
- Replace `#` with `https://facebook.com/yourpagename`

**To add your Instagram:**
- Replace `#` with `https://instagram.com/yourusername`

**WhatsApp is already set up** - just make sure the phone number is correct

---

## Adding Gallery Images

### Step 1: Add Your Images

1. Take high-quality photos of your completed work
2. Optimize them using TinyPNG or similar tool
3. Place them in the `public/images/gallery/` folder
4. Name them descriptively: `coffee-table-oak-finish.jpg`

### Step 2: Update Gallery Code

**File to edit:** `src/pages/Gallery.jsx`

1. Open the file and find the `galleryItems` array (around line 30)
2. Add a new item to the array:

```jsx
{
  id: 13,  // Use next available number
  title: 'Oak Coffee Table',  // Project name
  category: 'tables',  // Choose: tables, chairs, kitchen, installations, custom
  description: 'Beautiful oak coffee table with glass top',  // Short description
  image: '/images/gallery/coffee-table-oak.jpg',  // Your image path
},
```

3. Save the file
4. Your new image will appear in the gallery!

### Removing Gallery Items

1. Find the item in the `galleryItems` array
2. Delete the entire object (from `{` to `},`)
3. Save the file

---

## Changing Colors

### Understanding the Color System

The website uses a brown/wood-inspired color palette. Colors are defined in Tailwind CSS format.

**File to edit:** `tailwind.config.js`

### Main Color Palette

The colors are in the `primary` section (around line 10):

```javascript
primary: {
  50: '#faf8f5',   // Lightest - backgrounds
  100: '#f5f0e8',  // Very light
  200: '#e8dcc5',  // Light
  300: '#d4bc92',  // Light-medium
  400: '#c19a5f',  // Medium
  500: '#a87c3f',  // Main brand color
  600: '#8b6534',  // Darker - buttons
  700: '#6e4e2a',  // Dark
  800: '#523a1f',  // Very dark
  900: '#362615',  // Darkest - headings
},
```

### To Change the Main Brown Color

1. Open `tailwind.config.js`
2. Find `primary-600: '#8b6534'` (this is the main button color)
3. Replace with your preferred color code
4. You can use a color picker tool online to get color codes

**Helpful tool:** https://colorhunt.co/ for color palette ideas

### Quick Color Changes

To make the website less brown and more (for example) blue:

1. Change `primary-600` to a blue color like `#3b82f6`
2. Adjust other shades accordingly
3. Save and reload to see changes

**Note:** Keep the structure (50-900 shades) but change the colors themselves.

---

## Updating Testimonials

### Adding New Testimonials

**File to edit:** `src/pages/Home.jsx`

1. Open the file and find the `testimonials` array (around line 35)
2. Add a new testimonial:

```jsx
{
  id: 4,  // Next number
  name: 'Customer Name',  // Customer's name
  text: 'What they said about your work. Include specific details about the project and their satisfaction.',  // Their testimonial
  rating: 5,  // Stars (1-5)
},
```

3. Save the file

### Tips for Good Testimonials

- Ask customers permission before using their testimonial
- Include specific details (what you made, how long it lasted, etc.)
- Use full names or initials with permission
- Keep them authentic and genuine

### Removing Testimonials

1. Find the testimonial in the array
2. Delete the entire object (from `{` to `},`)
3. Save the file

---

## Updating Services List

### Adding a New Service

**File to edit:** `src/pages/Products.jsx`

Services are just products with `category: 'services'`. Follow the "Adding a New Product" instructions above, but set the category to 'services'.

**Also update the footer services list:**

**File:** `src/components/layout/Footer.jsx`

1. Find the "Our Services" section (around line 60)
2. Add a new list item:
   ```jsx
   <li>• Your New Service</li>
   ```
3. Save the file

---

## Quick Reference: Common File Locations

| What to Update | File Location |
|----------------|---------------|
| Home page content | `src/pages/Home.jsx` |
| About page story | `src/pages/About.jsx` |
| Products/Services | `src/pages/Products.jsx` |
| Gallery items | `src/pages/Gallery.jsx` |
| Contact info | `src/pages/Contact.jsx` |
| Footer | `src/components/layout/Footer.jsx` |
| Header/Navigation | `src/components/layout/Header.jsx` |
| Colors | `tailwind.config.js` |
| Site-wide styles | `src/index.css` |

---

## Testing Your Changes

After making any changes:

1. **Save all files** (Ctrl+S or Cmd+S)
2. **Check the browser** - your dev server should auto-reload
3. **Test on mobile** - use browser's responsive design mode
4. **Check for errors** - look at the browser console (F12)
5. **Test all pages** - click through navigation to ensure nothing broke

---

## Common Mistakes to Avoid

❌ **Don't delete commas** between array items  
✅ Each item except the last needs a comma

❌ **Don't delete closing brackets** `}` or `]`  
✅ Every opening bracket needs a closing one

❌ **Don't forget to save** your files  
✅ Save before checking the browser

❌ **Don't edit while server is off**  
✅ Run `npm run dev` first, then edit

---

## Getting Help

If something breaks:

1. **Undo your change** (Ctrl+Z)
2. **Check for error messages** in the terminal and browser console
3. **Look for red squiggly lines** in your code editor
4. **Make sure all brackets and quotes match**
5. **Restart the dev server:** Stop it (Ctrl+C) and run `npm run dev` again

---

## Pro Tips

💡 **Make small changes** - Edit one thing at a time and test  
💡 **Keep backups** - Copy files before major changes  
💡 **Use comments** - Add notes to remind yourself what code does  
💡 **Read the comments** - Code files have helpful comments explaining what each part does  
💡 **Test on real phones** - Check your phone after deploying  

---

**Remember:** The comments in each file explain what the code does. Read them carefully! [[memory:3449384]] Every change you make will be visible after saving the file and refreshing your browser.

**Need more help?** Review the main README.md file for additional information.

