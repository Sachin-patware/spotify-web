# Spotify Web

A responsive Spotify-inspired music streaming web app built with HTML, CSS, and JavaScript. The interface includes a modern dark theme, album cards, playlist browsing, song controls, volume adjustments, and a mini player experience similar to Spotify.

Live demo: [spotify-web-uqch.onrender.com](https://spotify-web-uqch.onrender.com/)

## Overview

This project recreates the feel of a music streaming platform in a lightweight static web application. It loads album data and song metadata from local JSON files, displays playlists, and lets users play, pause, skip, and scrub through tracks.

## Features

- Spotify-inspired dark UI
- Responsive layout for desktop and smaller screens
- Album/playlist cards for browsing music collections
- Dynamic song list rendering from local data files
- Audio playback controls:
  - Play/Pause
  - Previous/Next track
  - Seek bar scrubbing
  - Volume control
- Mobile-friendly sidebar and menu behavior
- Lightweight front-end without frameworks or build tools

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Local audio files and JSON metadata

## Project Structure

```text
spotify-web/
├── css/
│   ├── style.css
│   └── utility.css
├── img/
│   └── assets and SVG icons
├── js/
│   └── script.js
├── song/
│   ├── all/
│   ├── various-album-folders/
│   ├── index.json
│   └── ...
├── favicon.ico
├── index.html
└── README.md
```

## How It Works

- `index.html` structures the Spotify-like layout.
- `css/` contains styling for the layout, colors, spacing, and responsiveness.
- `js/script.js` handles:
  - fetching album and song metadata
  - rendering album cards and playlists
  - controlling the audio player
  - updating the progress bar and time display
  - managing sidebar and volume interactions
- `song/` contains album folders and metadata JSON files used to populate the app.

## Getting Started

Because the app loads local JSON and audio files via fetch, it should be served through a local web server instead of opening `index.html` directly with `file://`.

### Option 1: Python

```bash
cd spotify-web
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Option 2: VS Code Live Server

- Open the project in VS Code
- Install the Live Server extension
- Right-click `index.html` and choose "Open with Live Server"

## Usage

1. Open the app in the browser.
2. Browse through the album cards on the right side.
3. Click an album to load its songs.
4. Select any song from the library list.
5. Use the playback controls to play, pause, skip, or seek through tracks.
6. Adjust volume using the volume slider.

## Notes

- This project is built as a static front-end demo and does not include a backend or user authentication.
- Song metadata and track files are stored locally within the repository.
- The design is inspired by Spotify and uses UI patterns from the Spotify web player experience.

## Future Improvements

- Add a real backend/API for music data
- Support search and filtering
- Add playlist creation and favorites
- Improve mobile responsiveness further
- Add a dark/light theme toggle
- Implement better accessibility and keyboard navigation

## Author

Built as a front-end music player project inspired by Spotify.
