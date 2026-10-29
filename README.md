# Md. Sojibul Islam — Academic Portfolio

This is a static personal website hosted on GitHub Pages. It has no build step: plain HTML, CSS and JavaScript.

## Structure
| File | Purpose |
|---|---|
| `index.html` | Main page: profile, research, publications, experience, CV, ORCID, contact |
| `cv.html` | Printable CV (Ctrl+P → Save as PDF → `assets/cv.pdf`) |
| `assets/js/data.js` | **All content lives here.** Edit this file to update the site |
| `assets/js/main.js` | Renders the content and handles the menu, theme and filters |
| `assets/css/style.css` | Styles (light/dark, responsive, print) |
| `assets/img/profile.jpg` | Profile photo (square, ~600×600 px) |
| `assets/cv.pdf` | Downloadable CV |

## Adding a publication
Add an object to the `publications` array in `assets/js/data.js`:

```js
{
  type: "journal",            // journal | conference | preprint | other
  year: 2027,
  title: "Paper title",
  authors: "Author A, **Islam MS**, Author B",   // ** ** = shown in bold
  venue: "Journal name",
  details: "2027;12(3):45-56",
  doi: "10.xxxx/xxxxx",
  note: ""                     // e.g. "Accepted", "In press"
}
```

## Local preview
Open `index.html` in a browser. For a full test, including the CV check and ORCID count, run:

```
python -m http.server 8000
```

Then visit http://localhost:8000.
