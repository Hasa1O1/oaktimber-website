# Images Directory

This folder is where you should place all your images for the OAKTIMBER website.

## Recommended Folder Structure

```
public/images/
├── hero-image.jpg           # Main hero section image (home page)
├── workshop.jpg             # Workshop/craftsman photos
├── owner.jpg                # Photo of Dingani Leonard Peleka
├── coffee-table-placeholder.jpg
├── study-table-placeholder.jpg
├── kitchen-unit-placeholder.jpg
├── gallery/                 # Gallery page images
│   ├── coffee-table-1.jpg
│   ├── study-desk-1.jpg
│   ├── dining-chairs-1.jpg
│   ├── bar-stools-1.jpg
│   ├── kitchen-1.jpg
│   ├── kitchen-2.jpg
│   ├── tv-stand-1.jpg
│   ├── wall-art-1.jpg
│   ├── bookshelf-1.jpg
│   ├── bench-1.jpg
│   ├── office-desk-1.jpg
│   └── curtain-rod-1.jpg
└── products/                # Product category images
    ├── coffee-table.jpg
    ├── study-table.jpg
    ├── chairs.jpg
    ├── benches.jpg
    ├── kitchen-units.jpg
    ├── tv-stands.jpg
    ├── curtain-rods.jpg
    ├── wall-art.jpg
    └── drilling.jpg
```

## Image Guidelines

### Image Sizes and Formats

1. **Hero Images** (Home page)
   - Recommended size: 1920x1080 pixels or larger
   - Format: JPG (for photographs)
   - Keep file size under 500KB for fast loading

2. **Product Images**
   - Recommended size: 1200x800 pixels
   - Format: JPG or PNG
   - Keep file size under 300KB

3. **Gallery Images**
   - Recommended size: 1200x1200 pixels (square)
   - Format: JPG
   - Keep file size under 400KB

4. **Thumbnails/Small Images**
   - Recommended size: 400x400 pixels
   - Format: JPG
   - Keep file size under 100KB

### Photography Tips

- Use good lighting - natural light works best
- Take photos from multiple angles
- Ensure the background is clean and uncluttered
- Showcase the craftsmanship and details
- Include photos of:
  - Finished products
  - Work in progress (shows craftsmanship)
  - Workshop environment
  - Happy customers (with permission)
  - Close-ups of wood grain and finishes

### Optimization

Before uploading images, optimize them for web:

1. **Use image compression tools:**
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)
   - ImageOptim (Mac)

2. **Resize images** to appropriate dimensions (don't use 4000px images!)

3. **Convert to WebP** format for better compression (optional but recommended)

## Where Images Are Used

### Home Page (src/pages/Home.jsx)
- Hero section: `/images/hero-image.jpg`
- Featured products: `/images/coffee-table-placeholder.jpg`, etc.
- Why choose us section: `/images/workshop.jpg`

### About Page (src/pages/About.jsx)
- Owner photo: `/images/owner.jpg`
- Workshop photos: `/images/workshop.jpg`

### Products Page (src/pages/Products.jsx)
- Product images: `/images/products/*.jpg`

### Gallery Page (src/pages/Gallery.jsx)
- Gallery items: `/images/gallery/*.jpg`

## Updating Image Paths

After adding your images, update the image paths in the component files:

**Example in Home.jsx:**
```jsx
// Change this:
image: '/images/coffee-table-placeholder.jpg'

// To this (with your actual image name):
image: '/images/products/coffee-table.jpg'
```

## Need Help?

- Images not showing? Check the file path is correct
- Images too large? Use an image compression tool
- Need to crop/edit? Use free tools like:
  - Canva (https://canva.com)
  - Photopea (https://photopea.com)
  - GIMP (free Photoshop alternative)

---

**Remember:** Quality images are crucial for showcasing your craftsmanship! Take time to photograph your work well.

