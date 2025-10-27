import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    // Set proper content types
    if (filePath.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// This handles React Router routes properly.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Serving static files from ${path.join(__dirname, 'dist')}`);
});
