const axios = require('axios');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

exports.handler = async (event, context) => {
  const code = event.queryStringParameters.code;
  
  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing authorization code' }),
    };
  }

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
    
    // Redirect back to player with tokens
    return {
      statusCode: 302,
      headers: {
        Location: `/index.html?access_token=${accessToken}&refresh_token=${refreshToken}`,
      },
      body: '',
    };
  } catch (error) {
    console.error('Token exchange error:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication failed' }),
    };
  }
};
