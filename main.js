// main.js - Electron entry point for Neon Strike
// Loads the game's index.html into a window. No menu, no chrome.

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        title: 'Neon Strike',
        backgroundColor: '#000000',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false
        }
    });

    // Hide the default menu bar (File / Edit / View ...)
    win.setMenuBarVisibility(false);

    win.loadFile('index.html');

    // Optional: open devtools with F12 in dev
    win.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F12') {
            win.webContents.toggleDevTools();
        }
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

