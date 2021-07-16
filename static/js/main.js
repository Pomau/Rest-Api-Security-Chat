const path = require('path');
const url = require('url');
const {app, BrowserWindow, Menu} = require('electron');

let win;

//Menu.setApplicationMenu(false)
function createWindow() {
  
  win = new BrowserWindow({
    width: 700, 
    height: 500, 
    icon: __dirname + '/img/icon.png'
  });




  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));


  win.on('closed', () => {
    win = null;
  });

}

app.on('ready', createWindow);

app.on('window-all-closed', () => { app.quit();});





