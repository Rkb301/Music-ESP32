const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

exports.handler = async (event, context) => {
  try {
    const scopes = 'streaming user-read-email user-read-private';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}/callback&scope=${encodeURIComponent(scopes)}`;
    
    return {
      statusCode: 302,
      headers: {
        Location: authUrl,
      },
      body: '',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Login failed' }),
    };
  }
};
