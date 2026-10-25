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

