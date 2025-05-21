const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  //Carga el index.html de Angular compilado
  const indexPath = path.join(__dirname, 'dist', 'desk-app', 'browser', 'index.html');
  mainWindow.loadFile(indexPath);
}

app.whenReady().then(createWindow);

//Para macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
