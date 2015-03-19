# goog-streetview-gallery
## About
Street View gallery using MVC pattern:
  - Google Sheets API for the model.
  - SASS for the view.
  - Google Closure for the controller.

## Run a demo
- Clone this goog-streetview-gallery repo.
- Use <a href="http://gulpjs.com/" target="_blank">Gulp</a> to generate the minified files.
- Check out streetview.html to view the demo.

## Code details
- Data is written in Google Sheets, which acts like a database. For this demo, the data is written here:

  ```
  https://docs.google.com/spreadsheets/d/1pLm0dw1TgT0W8_CfGLVPfrgrFunW7GijNyHwwVv-dz4/
  ```

- The data is then retrieved through JSONP using Google Sheets API. For this demo, it's this:

  ```
  https://docs.google.com/spreadsheets/d/1pLm0dw1TgT0W8_CfGLVPfrgrFunW7GijNyHwwVv-dz4/gviz/tq?gid=gallery
  ```

- Then Google Closure JS is used to build the gallery. See <code>src/streetview.js.</code>
