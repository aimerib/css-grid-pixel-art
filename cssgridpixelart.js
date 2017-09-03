function cssGridPixelArt(url){
  loadIconsFromServer(url, drawCanvas);
}


function loadIconsFromServer(url, callDrawCanvas){

  var getPixelArtObjectRequest = new XMLHttpRequest();

  getPixelArtObjectRequest.open("GET", url, true);
  getPixelArtObjectRequest.send();
  getPixelArtObjectRequest.onreadystatechange = function(){
    
    if (this.readyState == 4 && this.status == 200) {
      
      callDrawCanvas(getPixelArtObjectRequest.responseText);

    }

  };
}



function drawCanvas(loadIconsFromServerResponse) {

  imgPixel = JSON.parse(loadIconsFromServerResponse);
  var i = imgPixel.length;

  while (i--){
    styleCanvas(imgPixel[i].name, imgPixel[i].iconHeight, imgPixel[i].iconWidth);
    drawIcon(imgPixel[i].name, imgPixel[i].iconHeight, imgPixel[i].iconWidth, imgPixel[i].pixelMap);
  }

}




function styleCanvas(className, canvasHeight, canvasWidth) {
  var canvasStyleSizePosition = "height:20vh; width:20vh; margin:0 auto;"
  var canvasStyleDisplay = "display:grid;" 
  var canvasStyleGridColumns = "grid-template-columns:repeat(" + canvasHeight + ", 1fr);"
  var canvasStyleGridRows = "grid-template-rows:repeat(" + canvasWidth + ", 1fr)"
  var canvasStyle = canvasStyleSizePosition + canvasStyleDisplay + canvasStyleGridColumns + canvasStyleGridRows
  var canvasObjects = document.getElementsByClassName(className);


  for (i = 0; i < canvasObjects.length; i++){
    canvasObjects[i].setAttribute("style", canvasStyle);
  }
  
}




function drawIcon(className, row, column, pixelOn) {

  var gridDivStyle = [];
  var iconNameCount = document.getElementsByClassName(className);
    
  for (i = 0; i < row; i++) {
    
    gridDivStyle.push([]); //initializes array rows

    for (j = 0; j < column; j++) {

      gridDivStyle[i][j] = "col-" + i + "-row-" + j;

      for (k=0; k < iconNameCount.length; k++){
        var gridDiv = document.createElement("div");
        var iconName = document.getElementsByClassName(className);

        gridDiv.className = gridDivStyle[i][j];
        iconName[k].appendChild(gridDiv);

        if (pixelOn[i][j]) { 

          var pixelOnClass = "col-" + i + "-row-" + j;
          var pixelOnObject = document.getElementsByClassName(pixelOnClass);
          var pixelOnStyle = "background-color:limegreen;"

          for (l = 0; l < pixelOnObject.length; l++){
            pixelOnObject[l].setAttribute("style", pixelOnStyle);
          }
  
        }

      }

      
      
    }


  }

}