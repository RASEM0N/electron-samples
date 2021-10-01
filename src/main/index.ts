import { app, BrowserWindow } from 'electron'
import { IS_MAC } from './constants'
import createMenu, { menuTemplate } from './menu'
import { createMainWindow } from './windows'

app.on('ready', () => {
    createMainWindow()
    createMenu(menuTemplate())

    // "unregister" devtools
    // globalShortcut.register('CmdOrCtrl+Shift+I', () => {
    //     return false
    // })
})

app.on('window-all-closed', () => {
    if (!IS_MAC) {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})
