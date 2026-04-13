const express = require('express');
const path = require('path');
const app = express();

// Hostinger assigns a port via environment variable
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
// express.static handles existing files automatically
app.use(express.static(path.join(__dirname, '.')));

// Fallback for any other request (SPA redirect to index.html)
// We only redirect if the request doesn't look like a file request (no extension)
app.get('/*splat', (req, res) => {
    if (req.path.includes('.')) {
        return res.status(404).send('File not found');
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`A3 Growth server is running on port ${PORT}`);
});
