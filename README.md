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
The transport labels are conservative planning heuristics, not a legal determination. Check the actual airline, airports, transit and destination rules. No item is labeled universally permitted. No tracking is used. The optional weather search sends the city name to Open-Meteo Geocoding, and city-center coordinates and trip dates to the Open-Meteo weather APIs. Profile and checklist state are stored in localStorage on the current browser; clearing browser data removes them. Keep a Markdown export for backup.

The repository includes only generic checklist entries, not original personal notes, names, itinerary details or vault links. Generated suggestions require review; items from multiple sections can overlap intentionally.

## Validation
Run `node tests.cjs`. Static files can be hosted by any static hosting provider. On GitHub Pages, choose `/docs` after copying the web files there, or deploy the web files using a Pages workflow. Publishing a private repository through Pages may require a paid plan and makes the page publicly accessible unless the organization supports private Pages.



## Hosted app

GitHub Pages: https://ehsanbz.github.io/safar-checklist/

Alternate website: https://hamrah-safar-checklist.primeflame14.chatgpt.site

The hosted app is publicly accessible without sign-in. To use locally, download the repository and open index.html.


## PDF export

Choose items, then click **خروجی PDF**. Review the finalized Persian A4 document and click **ذخیره PDF / چاپ**. In your browser print dialog, choose **Save as PDF**, A4 portrait, and disable browser headers and footers. All selected items are exported regardless of the active search or display filters; quantities, packing status, location and restriction notes are retained. Export stays on your device and does not upload trip data. This uses the browser's PDF printer rather than a direct PDF download.


## Seasons and dates

Each item shows season suitability (or year-round). Set Gregorian start/end dates; Persian dates and destination seasons appear in the summary and exports. The normal trip view and suggestions filter by every meteorological season touched by the inclusive date range (March-May spring, June-August summer, September-November autumn, December-February winter in the north; inverted in the south). Tropical mode disables seasonal exclusion. A manual season/all-seasons override supports mountains and unusual climates. Without dates, nothing is seasonally excluded. Existing selected items remain selected and exportable, with out-of-season warnings. The all-items bank and selected-items views intentionally retain access to items outside the date filter. Changing dates updates inclusive day count; changing day count updates the end date. This is a seasonal packing guide, not a weather forecast.


## Destination weather

The Persian sidebar uses Open-Meteo Geocoding plus Forecast and Historical Weather APIs, free for non-commercial use without an API key. Attribution links to Open-Meteo, ECMWF/ERA5 and CC BY 4.0 are shown in the panel. Select a city and set trip dates. Dates within the 16-day horizon use forecasts; recent past dates use model data, older dates use reanalysis. Dates beyond the forecast horizon show the matching period in up to three available previous years, explicitly labeled as comparisons, not forecasts or climate normals. These are gridded weather-service model/reanalysis data, not individual station observations. Only the first 16 trip days are displayed (clearly marked for longer trips). Missing values remain unknown. Responses are cached in memory for ten minutes; requests time out, cancel on date changes and tolerate partial failure. The saved city stays in localStorage; full checklist data is never sent to the provider. Weather is for sidebar planning and is not included in the checklist PDF.

Sources: https://open-meteo.com/en/docs · https://open-meteo.com/en/docs/historical-weather-api · https://open-meteo.com/en/docs/geocoding-api · https://open-meteo.com/en/terms
