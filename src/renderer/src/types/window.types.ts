// import { ListenerType } from './index'

export type WindowType = Window & typeof globalThis
export type WindowContextApiType = {
    ipcApi: {
        send: {
            imageMinimize: ({ from, value }: { from: string; value: number }) => void
        }

        on: {
            imageDone: (callback: () => void) => void
        }
    }

    liteNodeApi: {
        path: {
            join: (...paths: string[]) => string
        }

        os: {
            homedir: () => string
        }
    }
}
