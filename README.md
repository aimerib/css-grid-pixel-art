# CSS Grid Pixel Art

This is a simple exploration of using CSS grids for making pixel art.

I use a JSON file containing arrays of 0s and 1s representing a pixel's on/off state.
This JSON file is parsed into css classes applied to each div representing a pixel on screen.

This project uses TypeScript, so to run it you will need a bundler. For this specific project
I've used Vite.
For a quick start you can run:
```shell
npx vite
```

***Attention***

You will need NodeJS and NPM already installed in your system for the above to work.

If you just want to see the final result, the `build/` folder has a transpiled version of the `cssgridpixelart` code. Running the `index.html` file contained in that folder will load a page with the final result of the code.

## icons.json

The current format for icons.json is:
```json
{
    "name":"yourIconName",
    "pixelMap": [
        [], // each array inside the pixelMap represents a line of the pixel icon
    ],
    "iconHeight": 0, // both iconHeight and iconWidth units are in integers. If an icon is 29px tall and wide, then the height and width would be just 29 here.
    "iconWidth": 0
}
```

The icons.json used for this example can be found in the repo.

## Using the code
In your HTML code simple add a class with the same name as your icon to a div, and the code will draw the icon inside that div
