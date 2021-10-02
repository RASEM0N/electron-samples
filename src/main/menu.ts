import { Menu, MenuItemConstructorOptions } from 'electron'
import { IS_DEV, IS_MAC, IS_WINDOWS } from './constants'

export const menuTemplateMain = (): Array<MenuItemConstructorOptions> => {
    const template: Array<MenuItemConstructorOptions> = []

    if (IS_DEV) {
        template.push({})
    }

    if (IS_MAC) {
        template.push({})
    }

    if (IS_WINDOWS) {
        template.push({})
    }

    return template
}

export default (template: Array<MenuItemConstructorOptions>): void => {
    const menu: Menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
