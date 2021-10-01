import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { IS_MAC } from './constants'
import createMenu, { menuTemplate } from './menu'
import { createMainWindow } from './windows'
import * as path from 'path'
import * as os from 'os'
// import log from 'electron-log'
import { shrinkAndSaveImage } from './img'

let mainWindow: BrowserWindow

app.on('ready', () => {
    mainWindow = createMainWindow()
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

ipcMain.on('image:minimize', async (_, fileInfo) => {
    const to = path.join(os.homedir(), 'Downloads', 'imageshrink')

    await shrinkAndSaveImage({
        from: fileInfo.from,
        to: to,
        quality: fileInfo.value,
        successCb: (data) => {
            // log.info(data)
            mainWindow.webContents.send('image:done')
        },
        errorCb: (data) => {
            // log.error(data)
        },
    })
})

// ipcMain.on('image:folder-open', () => {
//     const to = slash(path.join(os.homedir(), 'Downloads', 'imageshrink'))
//     shell.openPath(to)
// })
