To use this library simply link it to your HTML and call it from your main() function in your own JavaScript code with an url for your icons.json file.

Example:

cssGridPixelArt('../assets/icons.json);

The current format for icons.json is:

{
"name":"yourIconName",
    "pixelMap": [
        [],
    ],
    
      "iconHeight": ,
      "iconWidth": 
}

In your HTML code simple add a class with the same name as your icon, and the library will draw the icon inside that div