/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { app, Menu, MenuItemConstructorOptions } from 'electron'
import { IS_MAC, IS_DEV } from './constants'
import { createAboutWindow } from './windows'

export const menuTemplate = (): Array<MenuItemConstructorOptions> => {
    const template: Array<MenuItemConstructorOptions> = []

    if (IS_MAC) {
        template.push({
            label: app.name,
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        createAboutWindow()
                    },
                },
            ],
        })
    }

    template.push({
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                accelerator: IS_MAC ? 'Command+Q' : 'Ctrl+Q',
                click: () => {
                    app.quit()
                },
            },
        ],
    })

    if (!IS_MAC) {
        template.push({
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        createAboutWindow()
                    },
                },
            ],
        })
    }

    if (IS_DEV) {
        template.push({
            label: 'Developer',
            submenu: [
                {
                    role: 'reload',
                },
                {
                    role: 'forceReload',
                },
                {
                    type: 'separator',
                },
                {
                    role: 'toggleDevTools',
                },
            ],
        })
    }

    return template
}

export default (template: Array<MenuItemConstructorOptions>): void => {
    const menu: Menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
