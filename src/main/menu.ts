import { BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'
import { IS_DEV, IS_MAC } from './constants'

export const menuTemplateMain = (win: BrowserWindow): Array<MenuItemConstructorOptions> => {
    const template: Array<MenuItemConstructorOptions> = []

    if (IS_MAC) {
        template.push({
            role: 'appMenu',
        })
    }

    template.push({
        role: 'fileMenu',
    })

    template.push({
        label: 'View',
        submenu: [
            {
                label: 'Toggle Navigation',
                click: () => {
                    win.webContents.send('nav:toggle')
                },
            },
        ],
    })

    if (IS_DEV) {
        template.push({
            label: 'Developer',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { type: 'separator' },
                { role: 'toggleDevTools' },
            ],
        })
    }

    return template
}

export default (template: Array<MenuItemConstructorOptions>): void => {
    const menu: Menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
