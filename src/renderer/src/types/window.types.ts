import { ListenerType } from './index'

export type WindowType = Window & typeof globalThis
export type WindowContextApiType = {
    MessagesAPI: {
        onLoaded: (callback: ListenerType<any>) => void
    }
}
