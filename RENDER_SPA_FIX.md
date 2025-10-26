# Fix 404 Error on Render - Keep Using Render

## The Issue
Render doesn't automatically handle React Router routes. When you refresh `/products`, it tries to find a file at that path instead of serving your React app.

## Solutions for Render

### Solution 1: Add a Catch-All Route Script (Recommended)

We need to create a simple Node.js file that tells Render to serve your React app for all routes.

**Step 1:** Create a `server.js` file in your root directory:

```javascript
const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

**Step 2:** Update your `package.json` to include express and add a start script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**Step 3:** Install express:
```bash
npm install express
```

**Step 4:** On Render, change the deployment type from "Static Site" to "Web Service"

**Step 5:** Update Render settings:
- Build Command: `npm run build`
- Start Command: `npm start`

This will make Render treat your app as a web service instead of a static site, which allows the catch-all route to work.

### Solution 2: Use Render Headers (Try This First - Easier)

**Step 1:** Go to your Render dashboard
**Step 2:** Click on your static site
**Step 3:** Go to Settings
**Step 4:** Scroll down to "Headers"
**Step 5:** Add a new header:
- Path Pattern: `/*`
- Name: `X-Rewrite-URL`
- Value: `/index.html`

**Step 6:** Click "Save Changes" and wait for redeployment

### Solution 3: Use a Different Build Output

Sometimes the issue is with how Render serves the files. Try this:

**Step 1:** Go to Render dashboard → Your site → Settings
**Step 2:** Change "Root Directory" to `dist`
**Step 3:** Save and redeploy

### Solution 4: Use Hash Router (Last Resort)

If none of the above work, we can switch React Router to use hash-based routing. This adds a `#` to URLs but avoids the routing issue entirely.

## After Applying a Fix

1. Wait for Render to redeploy
2. Go to https://oaktimber-website.onrender.com/about
3. Press F5 to refresh
4. If it works, you're done!

## Recommended Approach

Try **Solution 2** first (Headers). If that doesn't work, go with **Solution 1** (Express server).

Let me know which solution you want to try!
