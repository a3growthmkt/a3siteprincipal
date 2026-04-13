const express = require('express');
const path = require('path');
const app = express();

// Hostinger assigns a port via environment variable
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '.')));

// Fallback for any other request (useful for Single Page Applications)
app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`A3 Growth server is running on port ${PORT}`);
});
