// import { ListenerType } from './index'

export type WindowType = Window & typeof globalThis
export type WindowContextApiType = {
    themeApi: {
        toggle: () => Promise<boolean>
        toSystem: () => Promise<void>
    }
}
