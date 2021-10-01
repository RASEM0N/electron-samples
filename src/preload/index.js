// https://electronjs.org/docs/tutorial/security
import { contextBridge, ipcRenderer } from 'electron'
import { join } from 'path'
import { homedir } from 'os'

contextBridge.exposeInMainWorld('ipcApi', {
    send: {
        imageMinimize: (fileInfo) => {
            ipcRenderer.send('image:minimize', fileInfo)
        },
    },
    on: {
        imageDone: (callback) => {
            ipcRenderer.on('image:done', callback)
        },
    },
})

contextBridge.exposeInMainWorld('liteNodeApi', {
    path: {
        join: (...paths) => {
            return join(...paths)
        },
    },

    os: {
        homedir: () => {
            return homedir()
        },
    },
})
