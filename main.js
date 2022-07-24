const { app, BrowserWindow, Menu, dialog } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 1500,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // menu
  var menu = Menu.buildFromTemplate([
    {
      label: 'Actions',
      submenu: [
        {
          label: 'Save',
          click: () => {
            // get path
            dialog.showSaveDialog(win).then(path => {
              // check if canceled
              if (path.canceled != true) {
                win.webContents.send('save', path);
              }
            });
          } 
        },
        {
          label: 'Load',
          click: () => {
            // get path
            dialog.showOpenDialog(win).then(path => {
              // check if canceled
              if (path.canceled != true) {
                win.webContents.send('load', path);
              }
            });
          }
        },
        {
          label: 'Export to TTS',
          click: () => {
            dialog.showSaveDialog(win).then(path => {
              // check if canceled
              if (path.canceled != true) {
                win.webContents.send('export', path);
              }
            });
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);

  win.loadFile('src/index.html');

  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})