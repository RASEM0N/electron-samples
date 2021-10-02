// import { ListenerType } from './index'
import Mem from 'node-os-utils/lib/mem'
import Cpu from 'node-os-utils/lib/cpu'
import Os from 'node-os-utils/lib/os'

export type WindowType = Window & typeof globalThis
export type WindowContextApiType = {
    osApi: {
        mem: Mem
        cpu: Cpu
        os: Os
    }
    liteNodeApi: {
        path: {
            join: (...paths: string[]) => string
        }
    }
}
