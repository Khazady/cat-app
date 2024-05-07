import path, { join } from "path";
import { app, BrowserWindow, ipcMain } from "electron";

const windows: BrowserWindow[] = [];

function createWindows() {
  const mainWin = new BrowserWindow({
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
  } else {
    mainWin.loadFile(path.join(__dirname, "../dist/html/index.html"));
  }
  windows.push(mainWin);

  const buttonWin = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      sandbox: true,
      contextIsolation: true,
    },
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    buttonWin.loadURL("http://localhost:5175/html/button.html");
  } else {
    buttonWin.loadFile(path.join(__dirname, "../dist/html/button.html"));
  }
  windows.push(buttonWin);
}

app.whenReady().then(() => {
  createWindows();
});

app.on("window-all-closed", () => {
  windows.length = 0;
  app.quit();
});
