const express = require('express');
const axios = require('axios');

app.use(async (req, res, next) => {
    const ip = req.ip; // Capture client IP
    const response = await axios.get(`https://vpn-detection-api.com/check?ip=${ip}`);
    
    if (response.data.is_vpn) {
        return res.status(403).send('VPN access is not allowed');
    }
    next();
});

// Serve the HLS playlist
app.get('/stream.m3u8', (req, res) => {
    res.sendFile('/path/to/stream.m3u8');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
const express = require('express');
const axios = require('axios');

const app = express();

// Middleware to block VPNs
app.use(async (req, res, next) => {
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Call a VPN detection API
    const response = await axios.get(`https://proxycheck.io/v2/${clientIP}`, {
    params: {
    key: 'XMhIjpRPbtuOss0vziPK8iJ1nU35T78WwAPklndK0GSiXlQOoSLjW7DPYo9sirIWWaFplF8cywX9BO3Naj0KC4T4tE0ZbfFuBR3suO3UHJNkp1YYzFqAw7IGtINAmo80YDmC5eW93LufNBCl2ISqVTqtwcCYNYXWJoOCkCtgdG21aUKBtt32PpnDacIBnqzTHJzZeDb4k92Wsfnpha4rRd2lQY1bYgGJuHPR4sZFqbj5I3ue8ObatWPE0vBa6AAP',
            vpn: 1,
        }
    });

    if (response.data[clientIP] && response.data[clientIP].proxy === "yes") {
        return res.status(403).send('Access denied: VPN/Proxy detected.');
    }
    next();
});

// Serve the HLS playlist
app.get('/stream.m3u8', (req, res) => {
    res.sendFile('/path/to/stream.m3u8');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
