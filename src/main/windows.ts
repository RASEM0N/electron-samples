import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { IS_DEV } from './constants'

export const createMainWindow = (): BrowserWindow => {
    let win: BrowserWindow = new BrowserWindow({
        title: 'Application',
        width: 900,
        height: 800,
        icon: path.join(__dirname, '../resources/icon_256x256.png'),
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload', 'index.js'),
            devTools: IS_DEV,
        },
        backgroundColor: 'white',
    })

    win.loadFile('renderer/index.html').catch((e) => {
        console.error(`ERROR: ${e.message}`)
    })

    win.on('closed', () => {
        win = null
    })

    return win
}
