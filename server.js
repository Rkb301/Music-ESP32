require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname)));

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Step 1: Redirect to Spotify login
app.get('/login', (req, res) => {
  const scopes = 'streaming user-read-email user-read-private';
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}/callback&scope=${encodeURIComponent(scopes)}`;
  res.redirect(authUrl);
});

// Step 2: Handle callback and exchange code for token
app.get('/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }
    });
    
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    
    // Redirect back to player with token in URL/session
    res.redirect(`/prac.html?access_token=${accessToken}&refresh_token=${refreshToken}`);
  } catch (error) {
    console.error('Token exchange error:', error.response ? error.response.data : error.message);
    res.send('Authentication failed');
  }
});

// Token refresh endpoint
app.get('/refresh-token', async (req, res) => {
  const refreshToken = req.query.refresh_token;
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }
    });
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('Token refresh error:', error.message);
    res.status(400).send('Token refresh failed');
  }
});

app.listen(3000, () => {
  console.log('Spotify player running at http://localhost:3000');
});
