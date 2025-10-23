# OAKTIMBER - Carpentry Website

A professional, modern, and responsive website for OAKTIMBER, a carpentry workshop specializing in handcrafted wooden furniture and custom installations.

## About OAKTIMBER

OAKTIMBER is a carpentry workshop and manufacturing brand that produces high-quality wooden furniture and interior installations.

**Owner:** Dingani Leonard Peleka  
**Contact:** Dinganipeleka15@gmail.com | 0973131425

## Features

### Pages
- **Home Page** - Elegant hero section, business summary, featured products, testimonials, and CTAs
- **About Page** - Company story, mission, craftsmanship philosophy, and core values
- **Products & Services** - Comprehensive gallery of furniture and installation services
- **Gallery** - Portfolio showcase of completed works with category filtering
- **Contact Page** - Contact form, business details, and map location

### Design Highlights
- Clean, natural wood-inspired theme (brown, beige, and white tones)
- Fully responsive design for all devices
- Modern typography and subtle animations
- Professional UI/UX best practices
- Smooth navigation and user experience

## Technology Stack

- **Frontend Framework:** React 18
- **Styling:** Tailwind CSS 3
- **Routing:** React Router DOM 6
- **Icons:** React Icons
- **Build Tool:** Vite 5
- **Package Manager:** npm

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "Oaktimber website"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The website will open automatically in your browser at `http://localhost:3000`

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The build files will be in the `dist` folder, ready for deployment.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
Oaktimber website/
├── public/                    # Static assets
│   └── images/               # Image files (add your photos here)
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Header.jsx    # Navigation header
│   │       └── Footer.jsx    # Site footer
│   ├── pages/
│   │   ├── Home.jsx          # Home page
│   │   ├── About.jsx         # About page
│   │   ├── Products.jsx      # Products & Services page
│   │   ├── Gallery.jsx       # Gallery/Portfolio page
│   │   └── Contact.jsx       # Contact page
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles and Tailwind directives
├── index.html                # HTML template
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Customization Guide

### Adding Images

1. Place your images in the `public/images/` folder
2. Organize them in subfolders (e.g., `public/images/gallery/`)
3. Update image paths in the relevant page components
4. Replace placeholder images with your actual product photos

### Updating Content

Each page is a separate component in `src/pages/`:

- **Home.jsx** - Update hero text, featured products, testimonials
- **About.jsx** - Modify company story, values, and process steps
- **Products.jsx** - Add/edit product listings and descriptions
- **Gallery.jsx** - Update gallery items with your completed projects
- **Contact.jsx** - Update contact information, business hours, FAQ

### Changing Colors

The color theme is defined in `tailwind.config.js`. The current wood-inspired palette includes:

- Primary colors (brown tones): `primary-50` to `primary-900`
- Wood tones: `wood-light`, `wood-medium`, `wood-dark`
- Accent colors: `accent-cream`, `accent-beige`, `accent-brown`

To change colors, edit the `colors` section in `tailwind.config.js`.

### Modifying Fonts

Current fonts are loaded from Google Fonts in `index.html`:
- **Sans-serif:** Inter (for body text)
- **Serif:** Playfair Display (for headings)

To change fonts, update the Google Fonts link in `index.html` and the font family in `tailwind.config.js`.

## Contact Form Integration

The contact form currently displays a success message locally. To make it functional:

### Option 1: Email Service (Recommended for beginners)
Use a service like EmailJS, Formspree, or Web3Forms:

1. Sign up for a free account
2. Get your API key
3. Update the form submission handler in `src/pages/Contact.jsx`

### Option 2: Backend API
Create a backend server (Node.js/Express) to handle form submissions:

1. Set up a Node.js server
2. Create an endpoint to receive form data
3. Use a mail service (Nodemailer, SendGrid, etc.) to send emails
4. Update the form's `handleSubmit` function to call your API

### Option 3: Netlify Forms
If deploying to Netlify, you can use Netlify Forms (easiest option):

1. Add `data-netlify="true"` to the form tag
2. Deploy to Netlify
3. Forms will automatically work

## Deployment

### Deploy to Netlify (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Deploy to Vercel

1. Push your code to GitHub
2. Import your project in Vercel
3. Vercel will automatically detect Vite
4. Deploy!

### Other Hosting Options

You can also deploy to:
- GitHub Pages
- Firebase Hosting
- AWS Amplify
- Any static hosting service

## Services Offered

- Custom furniture manufacturing (coffee tables, study tables, chairs, stools, benches)
- Kitchen unit installations
- TV stand installations
- Curtain rod installations
- Wall art pieces
- Drilling and mounting services
- Works with maple wood, MDF, and compressed wood boards

## Future Enhancements

Ideas for future updates:
- Add backend for contact form submissions
- Implement a blog/news section
- Add client login area for project tracking
- Create online quote calculator
- Add payment integration for deposits
- Implement image gallery with actual project photos
- Add social media feed integration
- Create admin panel for content management

## Browser Support

This website works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Support

For questions or issues with the website code:
- Check the comments in each file for detailed explanations
- Review the Tailwind CSS documentation: https://tailwindcss.com
- Review the React documentation: https://react.dev

For business inquiries:
- Email: Dinganipeleka15@gmail.com
- Phone: 0973131425

## License

This website is proprietary software created for OAKTIMBER.

---

**Built with ❤️ for OAKTIMBER - Quality Craftsmanship Since [Year]**

