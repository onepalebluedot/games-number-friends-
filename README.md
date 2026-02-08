# Number Friends

A toddler-friendly iPad web game for learning number recognition from **1 to 9**.

## What It Does

- Shows a target number to find.
- Gives 3 large tap choices.
- Uses cheerful feedback, sparkle animation, and a success chime on correct answers.
- Includes speech support with a **Say Number** button.
- Lets the player choose a practice number (`1-9`) or tap **Next** for a random one.

## Tech

- Plain HTML, CSS, and JavaScript
- No framework
- No build step

## Run Locally

1. Open `/Users/johnvincent/Software Engineering/Number Learning Game/index.html` in a browser.
2. For best iPad testing, open it in Safari on iPad.

Optional local server:

```bash
cd "/Users/johnvincent/Software Engineering/Number Learning Game"
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Controls

- Tap a large number card to answer.
- Tap **Say Number** to hear the current target.
- Tap a number in **Choose a number to practice** to make it the current target.
- Tap **Next** to move to a random target number.

## Project Files

- `/Users/johnvincent/Software Engineering/Number Learning Game/index.html`
- `/Users/johnvincent/Software Engineering/Number Learning Game/styles.css`
- `/Users/johnvincent/Software Engineering/Number Learning Game/script.js`

## Deploy (Low Cost)

Good static hosting options:

- Cloudflare Pages
- GitHub Pages
- Netlify

Because this is a static game, deployment is simple: upload the files or connect a Git repo.
