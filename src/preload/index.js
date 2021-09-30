// https://electronjs.org/docs/tutorial/security
import { contextBridge, ipcRenderer } from 'electron'

// https://www.electronjs.org/docs/latest/api/ipc-renderer/#ipcrendererinvokechannel-args
contextBridge.exposeInMainWorld('themeApi', {
    toggle: () => {
        return ipcRenderer.invoke('theme-mode:toggle', 'toggle theme mode')
    },
    toSystem: () => {
        return ipcRenderer.invoke('theme-mode:system', 'to system theme mode')
    },
})
