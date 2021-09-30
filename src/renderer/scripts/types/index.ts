import type { IpcRenderer, IpcRendererEvent } from 'electron'
import type { WindowContextApiType, WindowType } from './window.types'

export type ListenerType<T> = (event: IpcRendererEvent, ...args: T[]) => IpcRenderer | void
export type ContextWindowType = WindowType & WindowContextApiType
