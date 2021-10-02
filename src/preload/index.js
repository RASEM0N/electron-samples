// https://electronjs.org/docs/tutorial/security
import { contextBridge, ipcRenderer } from 'electron'
import { join } from 'path'

contextBridge.exposeInMainWorld('osInfo', {
    getStaticData: () => {
        return ipcRenderer.invoke('os:static')
    },

    getDynamicData: () => {
        return ipcRenderer.invoke('os:dynamic')
    },
})

contextBridge.exposeInMainWorld('liteNodeApi', {
    path: {
        join: (...paths) => {
            return join(__dirname, ...paths)
        },
    },
})
