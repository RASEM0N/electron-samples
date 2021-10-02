import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { IS_DEV } from './constants'

export const createMainWindow = (): BrowserWindow => {
    let win: BrowserWindow = new BrowserWindow({
        title: 'Application',
        width: IS_DEV ? 800 : 500,
        height: 600,
        backgroundColor: 'white',
        resizable: IS_DEV,
        icon: path.join(__dirname, '../resources/icon.png'),
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload', 'index.js'),
            devTools: IS_DEV,
        },
    })

    win.loadFile('renderer/index.html').catch((e) => {
        console.error(`ERROR: ${e.message}`)
    })

    win.on('closed', () => {
        win = null
    })

    return win
}
