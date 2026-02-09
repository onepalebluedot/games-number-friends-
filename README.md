# Number Friends

A toddler-friendly iPad web game for learning number recognition from **1 to 9**.

## What It Does

- Shows a target number to find.
- Gives 3 large tap choices.
- Shows shape groups below each number option so players can count and match.
- Uses cheerful feedback, sparkle animation, and a success chime on correct answers.
- Includes speech support with a **Say Number** button.
- Lets the player choose a practice number (`1-9`) or tap **Next** for a random one.

## Tech

- Plain HTML, CSS, and JavaScript
- No framework
- No build step

## Run Locally

1. Open `index.html` in a browser.
2. For best iPad testing, open it in Safari on iPad.

Optional local server:

```bash
cd "<repo-folder>"
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Controls

- Tap a large number card to answer.
- Count the shapes under each option and match the correct number.
- Tap **Say Number** to hear the current target.
- Tap a number in **Choose a number to practice** to make it the current target.
- Tap **Next** to move to a random target number.

## Project Files

- `index.html`
- `styles.css`
- `script.js`
- `wrangler.jsonc`

## Deploy on Cloudflare (GitHub)

This repo includes `wrangler.jsonc` so it can deploy through Cloudflare Workers Builds.

### 1. Push your code to GitHub

```bash
git add .
git commit -m "Prepare deployment"
git push origin main
```

### 2. Connect the repo in Cloudflare

1. Open **Cloudflare Dashboard** -> **Workers & Pages**.
2. Click **Create application** -> **Import a repository**.
3. Choose **GitHub** and authorize Cloudflare if prompted.
4. Select this repository and branch (`main`).

### 3. Use these build settings

1. Build command: `exit 0` (or leave blank if allowed)
2. Deploy command: `npx wrangler deploy`
3. Root directory: repository root (or game subfolder if you move files later)

### 4. Deploy

1. Click **Save and Deploy**.
2. Cloudflare will publish your game URL on `*.workers.dev`.
3. A custom domain is optional.

## Other Low-Cost Options

- Cloudflare Pages
- GitHub Pages
- Netlify
