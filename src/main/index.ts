import { app, BrowserWindow } from 'electron'
import { createMainWindow } from './windows'
import { IS_DEV, IS_MAC } from './constants'
import createMenu, { menuTemplateMain } from './menu'

let mainMenu: BrowserWindow

app.on('ready', () => {
    mainMenu = createMainWindow()
    createMenu(menuTemplateMain(mainMenu))

    if (IS_DEV) {
        mainMenu.webContents.openDevTools()
    }

    mainMenu.on('close', () => {
        mainMenu = null
    })
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
