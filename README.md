# LVG OKR Dashboard — Local Setup

## Files
  index.html   — the dashboard (all CSS + JS in one file)
  server.js    — tiny Node server, no npm install needed
  README.md    — this file

---

## Step 1 — Make the Google Sheet publicly viewable

The dashboard reads your sheet directly. The sheet must allow public read access:

1. Open the sheet in Google Sheets
2. Click Share (top-right)
3. Under "General access" → click the dropdown → "Anyone with the link"
4. Make sure permission is set to "Viewer"
5. Click Done

The sheet ID is already set in index.html — no changes needed there.

---

## Step 2 — Run the server

You need Node.js installed (https://nodejs.org — any version ≥ 14 works).

Open a terminal in this folder and run:

    node server.js

You'll see:
    ✅  LVG OKR Dashboard is running
    Open this in your browser: http://localhost:3000

Open http://localhost:3000 in Chrome or Firefox.

---

## Alternative: Python (if you don't have Node)

    python -m http.server 3000

Then open http://localhost:3000

---

## How it works

- On load, the dashboard fetches your Google Sheet data using the Google Visualization API (no API key needed — this is why the sheet must be public)
- It reads two tabs: "Deal Detail" and "Lender Pipeline"
- The ↻ Refresh button re-fetches live data on demand
- The page also auto-refreshes every 5 minutes while it's open

---

## If data looks wrong or missing

Check the tab names in index.html around line 175:

    const TABS = {
      deals:    'Deal Detail',
      pipeline: 'Lender Pipeline',
    };

These must exactly match your sheet tab names (case-sensitive).

Also check the row ranges if you've added title rows:

    const RANGES = {
      deals:    'A3:J60',   // row 3 = header row in Deal Detail
      pipeline: 'A3:H40',  // row 3 = header row in Lender Pipeline
    };

If the header row moved (e.g., to row 4), change A3 to A4.

---

## Updating data

Just update your Google Sheet as normal.
Hit ↻ Refresh on the dashboard to pull the latest.
No need to touch any code files.
