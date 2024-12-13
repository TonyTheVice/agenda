const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'build', 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Required for `ipcRenderer`
    },
  });

  win.maximize();

  //win.loadURL('http://localhost:3000');
  win.loadFile(path.join(__dirname, 'build', 'index.html'));

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// Listen for the 'notify' event and show a notification
ipcMain.on('notify', (_, { title, body }) => {
  const notification = new Notification({
    title: title,
    body: body,
  });
  notification.show();
});
