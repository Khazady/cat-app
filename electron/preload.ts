import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}
try {
  contextBridge.exposeInMainWorld("context", {
    nextImage: () => ipcRenderer.invoke("nextImageEvent"),
    changeImage: (cb: Function) => ipcRenderer.on('changeImageEvent', (_event, value) => cb(value)),
  });
} catch (error) {
  console.error(error);
}

declare global {
  interface Window {
    context: {
      nextImage: () => void;
      changeImage: (cb: Function) => void;
    }
  }
}
