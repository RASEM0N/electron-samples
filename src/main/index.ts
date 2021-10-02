import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { createMainWindow } from './windows'
import { IS_DEV, IS_MAC } from './constants'
import { cpu, os, mem } from 'node-os-utils'
import createMenu, { menuTemplateMain } from './menu'
import { SystemLogoTry } from './tray'
import * as path from 'path'

let mainWindow: BrowserWindow
let appTray: SystemLogoTry
let isQuiting = false

app.on('ready', () => {
    mainWindow = createMainWindow()
    createMenu(menuTemplateMain(mainWindow))
    // eslint-disable-next-line
    appTray = new SystemLogoTry(path.join(__dirname, '../resources/icon.png'), mainWindow)

    mainWindow.on('close', (e) => {
        // if (!isQuiting) {
        //     e.preventDefault()
        //     mainWindow.hide()
        //     e.returnValue = true
        // }
        app.quit()
    })

    // open Directory, возвращает путь
    // dialog.showOpenDialogSync({
    //     title: 'Just title',
    //     properties: ['openDirectory'],
    // })

    if (IS_DEV) {
        mainWindow.webContents.openDevTools()
    }
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

app.on('before-quit', () => {
    isQuiting = true
})

ipcMain.handle('os:static', async () => {
    const memInfo = await mem.info()

    return {
        cpu: {
            model: cpu.model(),
        },
        os: {
            type: os.type(),
            arch: os.arch(),
            hostname: os.hostname(),
        },
        mem: {
            totalMemMb: memInfo.totalMemMb,
        },
    }
})

ipcMain.handle('os:dynamic', async () => {
    return {
        cpu: {
            usage: await cpu.usage(),
            free: await cpu.free(),
        },
        os: {
            uptime: os.uptime(),
        },
    }
})
