// If fetching iconsArray from an external endpoint, delete this line.
import iconsArray from './icons.json';

async function main() {
  const iconDivs: HTMLDivElement[] = Array.from(
    document.querySelectorAll('div[class^=sc-icon]')
  );
  iconDivs.forEach(async (icon: HTMLDivElement) => {
    const iconName: string = cssClassExtractor(icon);
    const newIcon: HTMLDivElement = await iconGenerator(iconName);
    icon.replaceWith(newIcon);
  });

}

document.addEventListener('DOMContentLoaded', main);

interface Icon {
  name: string;
  pixelMap: number[][];
  iconHeight: number;
  iconWidth: number;
  failedToFetch?: boolean;
  errorMessage?: string;
}

function cssClassExtractor(icon: HTMLDivElement): string {
  let iconName = icon.classList.value.split('-').pop();
  if (iconName !== undefined) {
    return iconName
  } else {
    return ""
  };
}

async function loadIconsFromServer(url: RequestInfo): Promise<Icon[]> {
  // If fetching the JSON with icon data from an external server
  // use this instead:
  // let request: Response, iconsArray: Icon[];
  // try {
  //   request = await fetch(url);
  //   iconsArray = await request.json();
  // } catch ({ message }) {
  //   return [
  //     {
  //       name: '',
  //       pixelMap: [],
  //       iconHeight: 0,
  //       iconWidth: 0,
  //       failedToFetch: true,
  //       errorMessage: message
  //     }
  //   ];
  // }
  return iconsArray;
}

async function iconGenerator(iconName: string): Promise<HTMLDivElement> {
  let isPortrait = window.matchMedia('all and (orientation:portrait)').matches
  const size: string = isPortrait ? "20vw" : "20vh";
  // Right now this is just simulating a fetch request, but returning the 
  // json file from this repository instead. To make actual network requests
  // just uncomment the code inside loadIconsFromServer
  const iconSheets: Icon[] = await loadIconsFromServer(
    'https://www.example.com/icons'
  );
  const currentIcon: Icon = iconSheets.filter(
    iconSheet => iconSheet.name.toUpperCase() === iconName.toUpperCase()
  )[0];
  let gridDivStyle: string[][] = [];
  const icon: HTMLDivElement = document.createElement('div');
  icon.setAttribute(
    'style',
    `height:${size};
    width:${size};
    margin:0 auto;
    display:grid; 
    grid-template-columns:repeat(${currentIcon.iconHeight}, 1fr); 
    grid-template-rows:repeat(${currentIcon.iconWidth}, 1fr)`
  );

  for (let i = 0; i < currentIcon.iconHeight; i++) {
    gridDivStyle.push([]);
    for (let j = 0; j < currentIcon.iconWidth; j++) {
      gridDivStyle[i][j] = 'col-' + i + '-row-' + j;
      let gridDiv = document.createElement('div');
      gridDiv.className = gridDivStyle[i][j];
      if (currentIcon.pixelMap[i][j]) {
        gridDiv.setAttribute('style', 'background-color:limegreen;');
      }
      icon.append(gridDiv);
    }
  }
  return icon;
}
