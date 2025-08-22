# Credit Hour Calculator v1.6

A single-page web application designed for educators to calculate student workload based on a predefined list of academic activities.

## Features

- Calculate total hours and hours per credit based on academic activities
- Real-time calculation updates
- Export to PDF functionality
- Support for English and Thai languages
- Responsive design for desktop and mobile devices

## How to Run

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build process or server required - it's a static web application

## Usage

1. Fill in the course information (name, code, credits, study weeks)
2. Enter the quantity for each academic activity
3. View the calculated totals in real-time
4. Use the "Export to PDF" button to generate a report
5. Use the language toggle button to switch between English and Thai

## Files

- `index.html` - Main HTML file
- `style.css` - Stylesheet
- `script.js` - JavaScript logic
- `translations.js` - Translation strings for English and Thai
- `prd.md` - Product Requirements Document

## Implementation Notes

The application is built with vanilla HTML, CSS, and JavaScript with no external dependencies except for the jsPDF library for PDF generation.

All activity data is derived from Appendix A in the `prd.md` file.