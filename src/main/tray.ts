import { Tray, BrowserWindow, app, Menu } from 'electron'

export class SystemLogoTry extends Tray {
    constructor(private imgPath: string, private readonly win: BrowserWindow) {
        super(imgPath)

        this.setToolTip('SystemTop') // hover text

        this.on('click', this.onClick)
        this.on('right-click', this.onRightClick)
    }

    private onClick = (): void => {
        if (this.win.isVisible()) {
            this.win.hide()
        } else {
            this.win.show()
        }
    }

    private onRightClick = (): void => {
        const menu = Menu.buildFromTemplate([
            {
                label: 'Show app',
                click: () => {
                    this.win.show()
                },
            },
            {
                type: 'separator',
            },
            {
                label: 'Quit',
                click: () => {
                    app.quit()
                },
            },
        ])

        this.popUpContextMenu(menu)
    }
}
