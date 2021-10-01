import * as path from 'path'
import { app, BrowserWindow } from 'electron'

let progressInterval: NodeJS.Timer

const createWindow = () => {
    let win: BrowserWindow = new BrowserWindow({
        title: 'Application',
        width: 900,
        height: 800,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload', 'index.js'),
        },
    })

    win.loadFile('renderer/index.html').catch((e) => {
        console.error(`ERROR: ${e.message}`)
    })

    win.on('closed', () => {
        win = null
    })

    const INCREMENT = 0.03
    const INTERVAL_DELAY = 100 // ms

    let c = 0
    progressInterval = setInterval(() => {
        win.setProgressBar(c)

        if (c < 2) {
            c += INCREMENT
        } else {
            c = -INCREMENT * 5
        }
    }, INTERVAL_DELAY)
}

app.on('before-quit', () => {
    clearInterval(progressInterval)
})

app.on('ready', () => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
