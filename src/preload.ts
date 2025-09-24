// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  login: (username: string, password: string) =>
    ipcRenderer.invoke("auth:login", { username, password }),
  register: (username: string, email: string, password: string) =>
    ipcRenderer.invoke("auth:register", { username, email, password }),
});
