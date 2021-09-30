import * as path from 'path'
import {
    app,
    BrowserWindow,
    ipcMain,
    nativeTheme,
    Menu,
    MenuItemConstructorOptions,
} from 'electron'

let win: BrowserWindow

const createWindow = () => {
    // const { width, height } = screen.getPrimaryDisplay().workAreaSize

    win = new BrowserWindow({
        title: 'Application',
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload', 'index.js'),
        },
    })

    win.webContents.openDevTools()

    win.loadFile('renderer/index.html').catch((e) => {
        console.error(`ERROR: ${e.message}`)
    })
}

win.on('closed', () => {
    win = null
})

app.on('ready', () => {
    createWindow()
    createMenu(menuTemplate)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// https://www.electronjs.org/docs/latest/api/ipc-main/#ipcmainhandlechannel-listener
ipcMain.handle('theme-mode:toggle', (_, data: string) => {
    console.log(data) // 'toggle theme mode'

    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }

    // boolean
    return nativeTheme.shouldUseDarkColors
})
ipcMain.handle('theme-mode:system', (_, data: string) => {
    console.log(data) // 'to system theme mode'

    nativeTheme.themeSource = 'system'

    // void
})

const createMenu = (menuTemplate: Array<MenuItemConstructorOptions>) => {
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
}

const menuTemplate: Parameters<typeof createMenu>[0] = [
    {
        label: 'Options',
        submenu: [
            {
                label: 'Quit',
                click: () => {
                    app.quit()
                },
            },
            {
                label: 'Devtools',
                click: () => {
                    win.webContents.openDevTools()
                },
            },
        ],
    },
]
