# ShopZone

A lightweight store dashboard with admin and customer views, real-time WebSocket sync, and order tracking.

## What’s included

- `index.html` — full client-side admin + customer UI
- `server.js` — Node.js backend with Express and WebSocket support
- `package.json` / `package-lock.json` — project dependencies and startup scripts
- `.gitignore` — excludes `node_modules`, environment files, logs, and editor artifacts

## Local setup

1. Open a terminal in the `shop` folder.
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open the app in your browser:

```text
http://localhost:3000
```

## Login credentials

- Admin: `Nii` / `11223344`
- Customer: any name + valid phone number

## How to update this repository on GitHub

Use the Git CLI from the `shop` folder:

1. Initialize Git if needed:

```bash
git init
```

2. Add all files:

```bash
git add .
```

3. Commit the current snapshot:

```bash
git commit -m "Initial ShopZone production-ready version"
```

4. Add your GitHub repo remote:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
```

5. Push to GitHub:

```bash
git branch -M main
 git push -u origin main
```

### Updating the repo later

1. Pull the latest changes:

```bash
git pull --rebase origin main
```

2. Make your changes.
3. Stage and commit:

```bash
git add .
 git commit -m "Describe your update"
```

4. Push:

```bash
git push origin main
```

## Production and security notes

- This app uses in-memory storage on the server and localStorage in the browser. Use a real database for production.
- A `CORS_ORIGIN` environment variable can be set to restrict allowed origins.
- Use HTTPS and a proper reverse proxy when deploying.
- Do not commit secrets. `.gitignore` already excludes common secret files.
- Review the hardcoded WhatsApp number and replace it with your own or remove it if not needed.

## Recommended commands

- Install packages: `npm install`
- Start server: `npm start`
- Run audit: `npm audit --production`

## Notes

- Orders are now normalized and synced via WebSockets.
- The server will fall back to a REST API if WebSocket is unavailable.
- Client-side templates are sanitized to reduce XSS risk.
