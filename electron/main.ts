import path, { join } from "path";
import { app, BrowserWindow, ipcMain, screen } from "electron";

const windows: BrowserWindow[] = [];

function createWindows() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWin = new BrowserWindow({
    width: width / 2,
    height: height,
    x: 0,
    y: 0,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      sandbox: true,
      contextIsolation: true,
    },
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWin.loadURL(
      path.posix.join(process.env.VITE_DEV_SERVER_URL, "html/index.html"),
    );
    mainWin.webContents.openDevTools({ mode: "bottom" });
  } else {
    mainWin.loadFile(path.join(__dirname, "../dist/html/index.html"));
  }
  windows.push(mainWin);

  const buttonWin = new BrowserWindow({
    width: width / 2,
    height: height,
    x: width / 2,
    y: 0,

    webPreferences: {
      preload: join(__dirname, "preload.js"),
      sandbox: true,
      contextIsolation: true,
    },
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    buttonWin.loadURL(
      path.posix.join(process.env.VITE_DEV_SERVER_URL, "html/button.html"),
    );
    buttonWin.webContents.openDevTools({ mode: "bottom" });
  } else {
    buttonWin.loadFile(path.join(__dirname, "../dist/html/button.html"));
  }
  windows.push(buttonWin);
}

app.whenReady().then(() => {
  createWindows();
  ipcMain.handle("nextImageEvent", () => {
    windows[0].webContents.send('changeImageEvent')
  });
});

app.on("window-all-closed", () => {
  windows.length = 0;
  app.quit();
});
