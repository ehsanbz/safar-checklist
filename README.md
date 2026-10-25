# همراه — Persian travel checklist

A responsive, right-to-left packing planner with 353 entries derived from a comprehensive travel checklist. No dependencies, account, server database or build step.

## Open
Open `index.html` directly in a browser. All assets are local. For a local development server, serve this directory using any static HTTP server.

## Features
- Multiple transport and accommodation choices, short/long trips and exact days.
- Checked luggage, cabin-only, small personal bag and backpack profiles.
- Editable airline dimensions/weight notes; these are not automatic allowance checks.
- Activity filters, Persian search, selected/unpacked/restriction views.
- Separate selection and packed states, quantities, carrying location, custom items.
- Browser-local persistence, Markdown export and printing selected items.

## Rules and privacy
The transport labels are conservative planning heuristics, not a legal determination. Check the actual airline, airports, transit and destination rules. No item is labeled universally permitted. No network calls or tracking are used by the application. Profile and checklist state are stored in localStorage on the current browser; clearing browser data removes them. Keep a Markdown export for backup.

The repository includes only generic checklist entries, not original personal notes, names, itinerary details or vault links. Generated suggestions require review; items from multiple sections can overlap intentionally.

## Validation
Run `node tests.cjs`. Static files can be hosted by any static hosting provider. On GitHub Pages, choose `/docs` after copying the web files there, or deploy the web files using a Pages workflow. Publishing a private repository through Pages may require a paid plan and makes the page publicly accessible unless the organization supports private Pages.



## Hosted app

GitHub Pages: https://ehsanbz.github.io/safar-checklist/

Alternate website: https://hamrah-safar-checklist.primeflame14.chatgpt.site

The hosted app is publicly accessible without sign-in. To use locally, download the repository and open index.html.


## PDF export

Choose items, then click **خروجی PDF**. Review the finalized Persian A4 document and click **ذخیره PDF / چاپ**. In your browser print dialog, choose **Save as PDF**, A4 portrait, and disable browser headers and footers. All selected items are exported regardless of the active search or display filters; quantities, packing status, location and restriction notes are retained. Export stays on your device and does not upload trip data. This uses the browser's PDF printer rather than a direct PDF download.
