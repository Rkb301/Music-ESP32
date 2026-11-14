# Music-ESP32 — Spotify-Connected Web Player Prototype

A personal experimental Spotify-connected music-player interface. The repository contains web UI files, a local **Node.js/Express** server, and **Netlify Functions** for authorization-related endpoints.

## What is in this repository
- HTML and CSS player interfaces (`index.html`, `prac.html`, `prac-spotify.html`, `prac.css`).
- Local Express service in `server.js` with Spotify login, token exchange, and refresh endpoints.
- Serverless endpoint examples in `functions/`.
- An npm project with dependencies declared in `package.json`.

**Scope:** Despite the repository name, it currently contains web/server code, not a complete ESP32 firmware sketch or a verified embedded-hardware build.

## Local setup
1. Install Node.js and npm.
2. Run `npm ci` in the repository root.
3. Copy `.env.example` to `.env` and enter your own **new** Spotify app credentials. Never commit `.env`.
4. Configure the Spotify developer app's redirect URI to match the callback URL used by the server; review `server.js` and the relevant Spotify dashboard settings.
5. Run `npm start` and open the local interface.

## Security and project status
- This is an **experimental prototype**, not a hardened production Spotify client.
- Keep all Spotify client secrets out of Git; use local `.env` files or secure hosting-provider environment variables. Rotate any credentials that may have been exposed.
- The current local server implementation puts tokens into URLs. This can expose tokens through browser history, logs, or referrers; do not use it with valuable accounts or deploy it publicly without redesigning session/token handling.
- The serverless functions must be configured with secrets through the hosting provider's secure environment settings.
- Hardware integration and production deployment are not validated by the repository contents.

## Next improvements
- Replace URL-based token handling with secure server-managed sessions or a suitable OAuth PKCE flow.
- Add integration tests and deployment verification.
- Add a UI screenshot/demo and any corresponding ESP32 firmware separately if available and approved for publication.

**Portfolio focus:** Web development · API integration · Node.js · Spotify OAuth exploration
