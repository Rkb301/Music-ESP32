const axios = require('axios');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

exports.handler = async (event, context) => {
  const refreshToken = event.queryStringParameters.refresh_token;
  
  if (!refreshToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing refresh token' }),
    };
  }

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ access_token: response.data.access_token }),
    };
  } catch (error) {
    console.error('Token refresh error:', error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Token refresh failed' }),
    };
  }
};
