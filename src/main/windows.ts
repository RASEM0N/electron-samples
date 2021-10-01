import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { IS_DEV } from './constants'

export const createMainWindow = (): BrowserWindow => {
    let win: BrowserWindow = new BrowserWindow({
        title: 'Image shrink',
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

export const createAboutWindow = (): BrowserWindow => {
    let aboutWin: BrowserWindow = new BrowserWindow({
        title: 'About Image Shrink',
        width: 300,
        height: 300,
        resizable: false,
        icon: path.join(__dirname, '../resources/icon_256x256.png'),
        webPreferences: {
            devTools: IS_DEV,
        },
        backgroundColor: 'white',
    })

    aboutWin.loadFile('renderer/about.html').catch((e) => {
        console.error(`ERROR: ${e.message}`)
    })

    aboutWin.menuBarVisible = false

    aboutWin.on('closed', () => {
        aboutWin = null
    })

    return aboutWin
}
